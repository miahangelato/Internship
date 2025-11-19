import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly repo: Repository<Session>,
  ) {}

  async create(dto: CreateSessionDto): Promise<Session> {
    const rec = this.repo.create({
      tenantId: String(dto.tenant_id),
      tableId: String(dto.table_id),
      sessionToken: dto.session_token,
      guestCount: dto.guest_count ?? 1,
      startedAt: dto.started_at ? new Date(dto.started_at) : undefined,
      expiresAt: dto.expires_at ? new Date(dto.expires_at) : undefined,
      isActive: dto.is_active ?? true,
      closedAt: dto.closed_at ? new Date(dto.closed_at) : undefined,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Session;
  }

  async findAll(): Promise<Session[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<Session> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`Session ${id} not found`);
    return r;
  }

  async update(id: number | string, dto: UpdateSessionDto): Promise<Session> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.table_id !== undefined ? { tableId: String(dto.table_id) } : {}),
      ...(dto.session_token !== undefined ? { sessionToken: dto.session_token } : {}),
      ...(dto.guest_count !== undefined ? { guestCount: dto.guest_count } : {}),
      ...(dto.expires_at !== undefined ? { expiresAt: dto.expires_at ? new Date(dto.expires_at) : null } : {}),
      ...(dto.is_active !== undefined ? { isActive: dto.is_active } : {}),
      ...(dto.closed_at !== undefined ? { closedAt: dto.closed_at ? new Date(dto.closed_at) : null } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Session;
  }

  async remove(id: number | string): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`Session ${id} not found`);
  }
}
