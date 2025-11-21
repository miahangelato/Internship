import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesController } from './user_roles.controller';
import { UserRolesService } from './user_roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';

describe('UserRolesController', () => {
  let controller: UserRolesController;
  let service: UserRolesService;

   let repoMock: any;
    beforeEach(async () => {
      repoMock = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
      };
      const module: TestingModule = await Test.createTestingModule({
        controllers: [UserRolesController],
        providers: [
          UserRolesService,
          {
            provide: getRepositoryToken(UserRole),
            useValue: repoMock,
          },
        ],
      }).compile();
  
      controller = module.get<UserRolesController>(UserRolesController);
      service = module.get<UserRolesService>(UserRolesService);
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new role for user', async () => {
    const dto = {
      user_id: '1',
      role_name: 'manager',
      permissions: {
        can_manage_menus: true,
        can_manage_orders: true,
        can_view_reports: true,
        can_manage_tenants: false,
      },
    };
    repoMock.create.mockReturnValue(dto);
    repoMock.save.mockResolvedValue({
      ...dto,
      id: 101,
      created_at: '2025-11-02T10:00:00Z',
      updated_at: '2025-11-02T10:00:00Z',
      roleName: 'manager',
    });
    const result = await controller.create(dto);
    expect(result.roleName).toBe('manager');
    expect(result.permissions.can_manage_menus).toBe(true);
  });

  it('should list all roles for user', async () => {
    repoMock.find.mockResolvedValue([
      {
        id: 101,
        user_id: 1,
        role_name: 'manager',
        permissions: {
          can_manage_menus: true,
          can_manage_orders: true,
          can_view_reports: true,
        },
        created_at: '2025-11-02T10:00:00Z',
        updated_at: '2025-11-02T10:00:00Z',
      },
    ]);
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should update a user role', async () => {
    const dto = {
      role_name: 'manager',
      permissions: {
        can_manage_menus: true,
        can_manage_orders: true,
        can_view_reports: true,
        can_manage_tenants: true,
      },
    };
    repoMock.findOne.mockResolvedValue({
      id: 101,
      user_id: 1,
      role_name: 'manager',
      permissions: {
        can_manage_menus: true,
        can_manage_orders: true,
        can_view_reports: true,
        can_manage_tenants: false,
      },
      created_at: '2025-11-02T10:00:00Z',
      updated_at: '2025-11-02T10:00:00Z',
    });
    repoMock.save.mockResolvedValue({
      id: 101,
      user_id: 1,
      role_name: 'manager',
      permissions: {
        can_manage_menus: true,
        can_manage_orders: true,
        can_view_reports: true,
        can_manage_tenants: true,
      },
      created_at: '2025-11-02T10:00:00Z',
      updated_at: '2025-11-02T11:00:00Z',
    });
    const result = await controller.update('101', dto);
    expect(result.permissions.can_manage_tenants).toBe(true);
  });

  it('should delete a user role', async () => {
    repoMock.delete.mockResolvedValue({ affected: 1 });
    const result = await controller.remove('101');
    expect(result).toBeUndefined();
  });
});
