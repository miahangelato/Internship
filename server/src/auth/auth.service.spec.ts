import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  const usersServiceMock = {
    findByEmailForAuth: jest.fn(),
    setRefreshToken: jest.fn(),
    markLastLogin: jest.fn(),
    findByIdWithRefreshToken: jest.fn(),
    findOne: jest.fn(),
  };
  const jwtServiceMock = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
  };
  const configServiceMock = {
    get: jest.fn((key: string) => {
      const defaults: Record<string, string | number> = {
        JWT_ACCESS_SECRET: 'access-secret',
        JWT_REFRESH_SECRET: 'refresh-secret',
        JWT_ACCESS_TTL: 1800,
        JWT_REFRESH_TTL: 604800,
      };
      return defaults[key];
    }),
  };
  const compareMock = bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>;

  const baseUser = {
    id: '1',
    tenantId: '10',
    username: 'staff001',
    email: 'staff@example.com',
    fullName: 'Staff One',
    role: 'staff',
    passwordHash: 'hashed-password',
    refreshTokenHash: null,
    languagePreference: 'ja',
    isActive: true,
    lastLoginAt: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    compareMock.mockReset();
    compareMock.mockResolvedValue(true);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('issues tokens on successful staff login', async () => {
    usersServiceMock.findByEmailForAuth.mockResolvedValue(baseUser);
    jwtServiceMock.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');

    const result = await service.login({
      email: 'staff@example.com',
      password: 'password123',
    });

    expect(result.user.id).toBe('1');
    expect(result.tokens.accessToken).toBe('access-token');
    expect(usersServiceMock.setRefreshToken).toHaveBeenCalledWith('1', 'refresh-token');
    expect(usersServiceMock.markLastLogin).toHaveBeenCalledWith('1');
  });

  it('rejects customer logins', async () => {
    usersServiceMock.findByEmailForAuth.mockResolvedValue({ ...baseUser, role: 'customer' });

    await expect(
      service.login({
        email: 'staff@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('refreshes tokens when refresh token is valid', async () => {
    jwtServiceMock.verifyAsync.mockResolvedValue({
      sub: '1',
      tenantId: '10',
      role: 'staff',
      email: 'staff@example.com',
    });
    usersServiceMock.findByIdWithRefreshToken.mockResolvedValue({
      ...baseUser,
      refreshTokenHash: 'stored-hash',
    });
    compareMock.mockResolvedValueOnce(true);
    jwtServiceMock.signAsync
      .mockResolvedValueOnce('new-access-token')
      .mockResolvedValueOnce('new-refresh-token');

    const result = await service.refreshTokens('incoming-refresh-token');

    expect(result.tokens.refreshToken).toBe('new-refresh-token');
    expect(usersServiceMock.setRefreshToken).toHaveBeenCalledWith('1', 'new-refresh-token');
  });

  it('throws unauthorized when refresh token is invalid', async () => {
    jwtServiceMock.verifyAsync.mockRejectedValue(new Error('bad token'));

    await expect(service.refreshTokens('bad')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('clears refresh token on logout', async () => {
    await service.logout('1');
    expect(usersServiceMock.setRefreshToken).toHaveBeenCalledWith('1', null);
  });

  it('returns profile information', async () => {
    usersServiceMock.findOne.mockResolvedValue(baseUser);
    const result = await service.getProfile('1');
    expect(result.id).toBe('1');
    expect(usersServiceMock.findOne).toHaveBeenCalledWith('1');
  });
});
