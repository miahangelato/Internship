import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SafeUser, JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const tokens = await this.generateTokens(user);
    await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
    await this.usersService.markLastLogin(user.id);
    return {
      user: this.toSafeUser(user),
      tokens,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.refreshSecret,
      });
      const user = await this.usersService.findByIdWithRefreshToken(payload.sub);
      if (!user || !user.refreshTokenHash) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const isTokenValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
      if (!isTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      if (user.tenantId !== payload.tenantId) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      this.ensureStaffOrAdmin(user);
      if (!user.isActive) {
        throw new ForbiddenException('User is inactive');
      }
      const tokens = await this.generateTokens(user);
      await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
      return {
        user: this.toSafeUser(user),
        tokens,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string | number): Promise<void> {
    await this.usersService.setRefreshToken(userId, null);
  }

  async getProfile(userId: string | number): Promise<SafeUser> {
    const user = await this.usersService.findOne(userId);
    return this.toSafeUser(user);
  }

  private async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findByEmailForAuth(loginDto.email.trim());
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.isActive) {
      throw new ForbiddenException('User is inactive');
    }
    this.ensureStaffOrAdmin(user);

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private async generateTokens(user: User): Promise<AuthTokens> {
    const payload: JwtPayload = {
      sub: user.id,
      tenantId: user.tenantId,
      role: user.role,
      email: user.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.accessSecret,
        expiresIn: `${this.accessTokenTtlSeconds}s`,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.refreshSecret,
        expiresIn: `${this.refreshTokenTtlSeconds}s`,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      tenantId: user.tenantId,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      languagePreference: user.languagePreference,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private ensureStaffOrAdmin(user: User) {
    if (!['staff', 'admin'].includes(user.role)) {
      throw new ForbiddenException('Only staff and admin users can sign in');
    }
  }

  private get accessSecret(): string {
    return this.configService.get<string>('JWT_ACCESS_SECRET') ?? 'change_me_access_secret';
  }

  private get refreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET') ?? 'change_me_refresh_secret';
  }

  private get accessTokenTtlSeconds(): number {
    return Number(this.configService.get<number>('JWT_ACCESS_TTL') ?? 1800);
  }

  private get refreshTokenTtlSeconds(): number {
    return Number(this.configService.get<number>('JWT_REFRESH_TTL') ?? 60 * 60 * 24 * 7);
  }
}
