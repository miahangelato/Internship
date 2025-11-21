import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { Tenant } from './entities/tenant.entity';

describe('TenantsController', () => {
  let controller: TenantsController;
  let service: TenantsService;

  const mockTenantRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TenantsController],
      providers: [
        TenantsService,
        { provide: getRepositoryToken(Tenant), useValue: mockTenantRepository },
      ],
    }).compile();

    controller = module.get(TenantsController);
    service = module.get(TenantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return success and data for createTenant', async () => {
    const dto = {
      name: 'Ramen Ichiban',
      subdomain: 'ichiban',
      default_language: 'ja',
      currency: 'JPY',
      timezone: 'Asia/Tokyo',
      subscription_plan: 'premium',
      subscription_status: 'active',
      monthly_fee: 5500,
      max_tables: 30,
      address: 'Tokyo, Shinjuku',
      phone: '+81-90-1234-5678',
      email: 'owner@ichiban.jp',
      is_active: true
    };
    const expected = {
      id: 10,
      ...dto,
      created_at: '2025-11-02T10:00:00Z',
      updated_at: '2025-11-02T10:00:00Z',
    };
    jest.spyOn(service, 'createTenant').mockResolvedValue(expected);
    const result = await controller.create(dto);
    expect(result).toEqual({ success: true, data: expected });
    expect(service.createTenant).toHaveBeenCalledWith(dto);
  });

  it('should return success and data for getTenants', async () => {
    const expected = [{
      id: 10,
      name: 'Ramen Ichiban',
      subdomain: 'ichiban',
      default_language: 'ja',
      currency: 'JPY',
      timezone: 'Asia/Tokyo',
      subscription_plan: 'premium',
      subscription_status: 'active',
      monthly_fee: 5500,
      max_tables: 30,
      address: 'Tokyo, Shinjuku',
      phone: '+81-90-1234-5678',
      email: 'owner@ichiban.jp',
      is_active: true,
      created_at: '2025-11-02T10:00:00Z',
      updated_at: '2025-11-02T10:00:00Z',
    }];
    jest.spyOn(service, 'getTenants').mockResolvedValue(expected);
    const result = await controller.findAll();
    expect(result).toEqual({ success: true, data: expected });
    expect(service.getTenants).toHaveBeenCalled();
  });

  it('should return success and data for updateTenant', async () => {
    const id = '10';
    const dto = {
      name: 'Ramen Ichiban Premium',
      subscription_plan: 'enterprise',
      subscription_status: 'active',
      monthly_fee: 10000,
      max_tables: 50,
      is_active: true
    };
    const expected = {
      id: 10,
      name: 'Ramen Ichiban Premium',
      subdomain: 'ichiban',
      default_language: 'ja',
      currency: 'JPY',
      timezone: 'Asia/Tokyo',
      subscription_plan: 'enterprise',
      subscription_status: 'active',
      monthly_fee: 10000,
      max_tables: 50,
      address: 'Tokyo, Shinjuku',
      phone: '+81-90-1234-5678',
      email: 'owner@ichiban.jp',
      is_active: true,
      created_at: '2025-11-02T10:00:00Z',
      updated_at: '2025-11-02T14:00:00Z',
    };
    jest.spyOn(service, 'updateTenant').mockResolvedValue(expected);
    const result = await controller.update(id, dto);
    expect(result).toEqual({ success: true, data: expected });
    expect(service.updateTenant).toHaveBeenCalledWith(id, dto);
  });

  it('should return success and data for deleteTenant', async () => {
    const id = '10';
    const expected = { deleted_tenant_id: 10 };
    jest.spyOn(service, 'deleteTenant').mockResolvedValue(expected);
    const result = await controller.remove(id);
    expect(result).toEqual({ success: true, data: expected });
    expect(service.deleteTenant).toHaveBeenCalledWith(id);
  });
});