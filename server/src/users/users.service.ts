import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly passwordSaltRounds = 12;

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create({
      tenantId: String(createUserDto.tenant_id),
      username: createUserDto.username,
      email: createUserDto.email.toLowerCase(),
      fullName: createUserDto.full_name,
      role: createUserDto.role ?? 'staff',
      languagePreference: createUserDto.language_preference ?? 'ja',
      isActive: createUserDto.is_active ?? true,
      passwordHash: await this.hashSecret(createUserDto.password),
    } as Partial<User>);
    const saved = await this.usersRepo.save(user);
    return this.sanitize(saved);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findOne(id: number | string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id: String(id) } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async findByEmail(tenantId: string | number, email: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { tenantId: String(tenantId), email: email.toLowerCase() },
    });
  }

  async findByEmailForAuth(email: string, tenantId?: string | number): Promise<User | null> {
    const qb = this.usersRepo
      .createQueryBuilder('user')
      .addSelect(['user.passwordHash', 'user.refreshTokenHash'])
      .where('LOWER(user.email) = LOWER(:email)', { email });

    if (tenantId !== undefined) {
      qb.andWhere('user.tenantId = :tenantId', { tenantId: String(tenantId) });
    }

    return qb.getOne();
  }

  async findByIdWithRefreshToken(id: number | string): Promise<User | null> {
    return this.usersRepo
      .createQueryBuilder('user')
      .addSelect(['user.refreshTokenHash'])
      .where('user.id = :id', { id: String(id) })
      .getOne();
  }

  async update(id: number | string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.tenant_id !== undefined) user.tenantId = String(updateUserDto.tenant_id);
    if (updateUserDto.username !== undefined) user.username = updateUserDto.username;
    if (updateUserDto.email !== undefined) user.email = updateUserDto.email.toLowerCase();
    if (updateUserDto.full_name !== undefined) user.fullName = updateUserDto.full_name;
    if (updateUserDto.role !== undefined) user.role = updateUserDto.role;
    if (updateUserDto.language_preference !== undefined)
      user.languagePreference = updateUserDto.language_preference;
    if (updateUserDto.is_active !== undefined) user.isActive = updateUserDto.is_active;
    if (updateUserDto.password) {
      user.passwordHash = await this.hashSecret(updateUserDto.password);
    }
    const saved = await this.usersRepo.save(user);
    return this.sanitize(saved);
  }

  async remove(id: number | string): Promise<void> {
    const res = await this.usersRepo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`User ${id} not found`);
  }

  async setRefreshToken(userId: number | string, refreshToken: string | null): Promise<void> {
    const hashed = refreshToken ? await this.hashSecret(refreshToken) : null;
    await this.usersRepo.update(String(userId), { refreshTokenHash: hashed });
  }

  async markLastLogin(userId: number | string): Promise<void> {
    await this.usersRepo.update(String(userId), { lastLoginAt: new Date() });
  }

  private async hashSecret(value: string): Promise<string> {
    return bcrypt.hash(value, this.passwordSaltRounds);
  }

  private sanitize<T extends User | null>(user: T): T {
    if (!user) return user;
    delete (user as Partial<User>).passwordHash;
    delete (user as Partial<User>).refreshTokenHash;
    return user;
  }
}
