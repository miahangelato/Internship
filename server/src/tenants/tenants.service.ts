import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  // ----------------------------------------
  // CREATE
  // ----------------------------------------
  async create(dto: CreateTenantDto): Promise<Tenant> {
    // Required field validation (same pattern as Menu)
    if (!dto.name) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation error',
        details: { name: dto.name },
      });
    }

    if (dto.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email)) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation error',
        details: { email: dto.email },
      });
    }

    if (dto.maxTables !== undefined && (dto.maxTables < 1 || dto.maxTables > 500)) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation error',
        details: { maxTables: dto.maxTables },
      });
    }

    // Unique subdomain check? (optional)
    if (dto.subdomain) {
      const existing = await this.tenantRepository.findOne({
        where: { subdomain: dto.subdomain },
      });

      if (existing) {
        throw new ConflictException({
          code: 'DUPLICATE_RESOURCE',
          message: 'Duplicate resource',
          details: { subdomain: dto.subdomain },
        });
      }
    }

    // Create and save
    const tenant = this.tenantRepository.create(dto);
    return await this.tenantRepository.save(tenant);
  }

  // ----------------------------------------
  // FIND ALL
  // ----------------------------------------
  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  // ----------------------------------------
  // FIND ONE
  // ----------------------------------------
  async findOne(id: number): Promise<Tenant> {
    const rec = await this.tenantRepository.findOne({ where: { id } });

    if (!rec) {
      throw new NotFoundException({
        code: 'RESOURCE_NOT_FOUND',
        message: 'Resource not found',
        details: { id },
      });
    }

    return rec;
  }

  // ----------------------------------------
  // UPDATE
  // ----------------------------------------
  async update(id: number, dto: UpdateTenantDto): Promise<Tenant> {
    const rec = await this.findOne(id);

    // Manual field validation (same pattern)
    if (dto.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email)) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation error',
        details: { email: dto.email },
      });
    }

    if (dto.maxTables !== undefined && (dto.maxTables < 1 || dto.maxTables > 500)) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation error',
        details: { maxTables: dto.maxTables },
      });
    }

    if (dto.subdomain) {
      const existing = await this.tenantRepository.findOne({
        where: { subdomain: dto.subdomain },
      });

      if (existing && existing.id !== rec.id) {
        throw new ConflictException({
          code: 'DUPLICATE_RESOURCE',
          message: 'Duplicate resource',
          details: { subdomain: dto.subdomain },
        });
      }
    }

    Object.assign(rec, dto);

    return await this.tenantRepository.save(rec);
  }

  // ----------------------------------------
  // REMOVE
  // ----------------------------------------
  async remove(id: number): Promise<void> {
    const result = await this.tenantRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException({
        code: 'RESOURCE_NOT_FOUND',
        message: 'Resource not found',
        details: { id },
      });
    }
  }
}
