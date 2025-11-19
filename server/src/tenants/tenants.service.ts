import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';

const DEFAULT_TENANT_VALUES = {
  defaultLanguage: 'ja',
  currency: 'THB',
  timezone: 'Asia/Bangkok',
  subscriptionPlan: 'basic',
  subscriptionStatus: 'active',
  monthlyFee: 3000,
  maxTables: 30,
  isActive: true,
};

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}


  async createTenant(dto: CreateTenantDto) {
    const tenant = this.tenantsRepository.create({
      ...dto,
      defaultLanguage: dto.defaultLanguage ?? DEFAULT_TENANT_VALUES.defaultLanguage,
      currency: dto.currency ?? DEFAULT_TENANT_VALUES.currency,
      timezone: dto.timezone ?? DEFAULT_TENANT_VALUES.timezone,
      subscriptionPlan: dto.subscriptionPlan ?? DEFAULT_TENANT_VALUES.subscriptionPlan,
      subscriptionStatus: dto.subscriptionStatus ?? DEFAULT_TENANT_VALUES.subscriptionStatus,
      monthlyFee: this.normalizeMonthlyFee(dto.monthlyFee ?? DEFAULT_TENANT_VALUES.monthlyFee),
      maxTables: dto.maxTables ?? DEFAULT_TENANT_VALUES.maxTables,
      isActive: dto.isActive ?? DEFAULT_TENANT_VALUES.isActive,
    });
    return this.tenantsRepository.save(tenant);
  }

  getTenants() {
    return this.tenantsRepository.find();
  }

  async updateTenant(id: string, dto: UpdateTenantDto) {
    const tenant = await this.tenantsRepository.preload({
      id,
      ...dto,
      monthlyFee:
        dto.monthlyFee !== undefined
          ? this.normalizeMonthlyFee(dto.monthlyFee)
          : undefined,
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant with id ${id} not found`);
    }
    return this.tenantsRepository.save(tenant);
  }

  async deleteTenant(id: string) {
    const tenant = await this.tenantsRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with id ${id} not found`);
    }
    await this.tenantsRepository.remove(tenant);
    return tenant;
  }

  private normalizeMonthlyFee(value?: number) {
    return value !== undefined ? value.toString() : undefined;
  }
}
