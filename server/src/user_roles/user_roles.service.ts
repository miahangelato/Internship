import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { UserRole } from './entities/user_role.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly repo: Repository<UserRole>,
  ) {}

  async create(dto: CreateUserRoleDto): Promise<UserRole> {
    const rec = this.repo.create({
      userId: String(dto.user_id),
      roleName: dto.role_name,
      permissions: dto.permissions ?? null,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as UserRole;
  }

  async findAll(): Promise<UserRole[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<UserRole> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`UserRole ${id} not found`);
    return r;
  }

  async update(id: number | string, dto: UpdateUserRoleDto): Promise<UserRole> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.role_name !== undefined ? { roleName: dto.role_name } : {}),
      ...(dto.permissions !== undefined ? { permissions: dto.permissions } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as UserRole;
  }

  async remove(id: number | string): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`UserRole ${id} not found`);
  }
}
