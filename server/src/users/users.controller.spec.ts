import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let repoMock: Record<string, jest.Mock>;

  beforeEach(async () => {
    repoMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repoMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('creates a new staff user and strips sensitive fields', async () => {
    const dto = {
      tenant_id: '10',
      username: 'staff001',
      email: 'staff001@example.com',
      full_name: 'Staff One',
      role: 'staff',
      language_preference: 'ja',
      is_active: true,
      password: 'password123',
    };
    repoMock.create.mockImplementation((entity) => entity);
    repoMock.save.mockImplementation(async (entity) => ({
      ...entity,
      id: '1',
    }));

    const result = await controller.create(dto as any);
    expect(result).toMatchObject({
      id: '1',
      username: 'staff001',
      role: 'staff',
    });
    expect((result as any).passwordHash).toBeUndefined();
    expect(repoMock.save).toHaveBeenCalled();
  });

  it('updates user details', async () => {
    const existingUser: User = {
      id: '1',
      tenantId: '10',
      tenant: null,
      cognitoUserId: null,
      username: 'staff001',
      email: 'staff001@example.com',
      fullName: 'Staff One',
      role: 'staff',
      passwordHash: 'hashed',
      refreshTokenHash: null,
      languagePreference: 'ja',
      isActive: true,
      lastLoginAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repoMock.findOne.mockResolvedValue(existingUser);
    repoMock.save.mockImplementation(async (entity) => ({
      ...entity,
      role: 'admin',
      languagePreference: 'en',
    }));

    const dto = {
      role: 'admin',
      language_preference: 'en',
    };

    const result = await controller.update('1', dto as any);
    expect(result.role).toBe('admin');
    expect(result.languagePreference).toBe('en');
  });

  it('returns list of users', async () => {
    const list = [
      {
        id: '1',
        tenantId: '10',
        username: 'staff001',
        email: 'staff001@example.com',
        role: 'staff',
        isActive: true,
      },
    ];
    repoMock.find.mockResolvedValue(list);

    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('username', 'staff001');
  });
});
