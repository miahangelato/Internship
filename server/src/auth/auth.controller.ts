import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtPayload, SafeUser } from './interfaces/jwt-payload.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly accessCookieName = 'access_token';
  private readonly refreshCookieName = 'refresh_token';

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Returns authenticated staff/admin user plus access and refresh tokens.',
  })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);
    this.persistSession(req, result.user);
    this.setAuthCookies(res, result.tokens.accessToken, result.tokens.refreshToken);
    return this.buildLoginResponse(result.user, result.tokens.accessToken, result.tokens.refreshToken);
  }

  @ApiBody({ type: RefreshTokenDto })
  @Post('refresh')
  async refresh(
    @Body() refreshDto: RefreshTokenDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokenFromBody = refreshDto.refresh_token?.trim();
    const tokenFromCookie = req.cookies?.[this.refreshCookieName];
    const refreshToken = tokenFromBody || tokenFromCookie;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    const result = await this.authService.refreshTokens(refreshToken);
    this.persistSession(req, result.user);
    this.setAuthCookies(res, result.tokens.accessToken, result.tokens.refreshToken);
    return {
      success: true,
      data: {
        access_token: result.tokens.accessToken,
        refresh_token: result.tokens.refreshToken,
        expires_in: this.accessTokenTtlMs / 1000,
        token_type: 'Bearer',
      },
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const jwtUser = req.user as JwtPayload;
    await this.authService.logout(jwtUser.sub);
    this.clearAuthCookies(res);
    this.clearSession(req);
    return { success: true };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    const jwtUser = req.user as JwtPayload;
    const profile = await this.authService.getProfile(jwtUser.sub);
    return { success: true, data: profile };
  }

  private buildLoginResponse(user: SafeUser, accessToken: string, refreshToken: string) {
    return {
      success: true,
      data: {
        user,
        tokens: {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: this.accessTokenTtlMs / 1000,
          token_type: 'Bearer',
        },
      },
    };
  }

  private persistSession(req: Request, user: SafeUser) {
    if (!req.session) return;
    req.session.userId = user.id;
    req.session.tenantId = user.tenantId;
    req.session.role = user.role;
  }

  private clearSession(req: Request) {
    if (!req.session) return;
    req.session.userId = undefined;
    req.session.tenantId = undefined;
    req.session.role = undefined;
    if (typeof req.session.destroy === 'function') {
      req.session.destroy(() => undefined);
    }
  }

  private setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie(this.accessCookieName, accessToken, this.buildCookieOptions(this.accessTokenTtlMs));
    res.cookie(this.refreshCookieName, refreshToken, this.buildCookieOptions(this.refreshTokenTtlMs));
  }

  private clearAuthCookies(res: Response) {
    const expiredOptions = this.buildCookieOptions(0);
    res.clearCookie(this.accessCookieName, expiredOptions);
    res.clearCookie(this.refreshCookieName, expiredOptions);
  }

  private buildCookieOptions(maxAge: number) {
    return {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: this.isProduction,
      maxAge,
      path: '/',
    };
  }

  private get isProduction(): boolean {
    return (this.configService.get<string>('NODE_ENV') ?? 'development') === 'production';
  }

  private get accessTokenTtlMs(): number {
    return this.resolveTtlMs(this.configService.get('JWT_ACCESS_TTL'), 1800);
  }

  private get refreshTokenTtlMs(): number {
    return this.resolveTtlMs(this.configService.get('JWT_REFRESH_TTL'), 60 * 60 * 24 * 7);
  }

  private resolveTtlMs(value: string | number | undefined, fallbackSeconds: number): number {
    const seconds = Number(value ?? fallbackSeconds);
    return seconds * 1000;
  }
}
