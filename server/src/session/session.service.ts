import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionEntity } from './entities/session.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repo: Repository<SessionEntity>,
  ) {}

  async create(dto: CreateSessionDto): Promise<SessionEntity> {
    if (!dto.tenant_id || !dto.table_id) {
      throw new BadRequestException({
        details: "tenant_id and table_id are required."
      });
    }

    const rec = this.repo.create({
      tenantId: String(dto.tenant_id),
      tableId: String(dto.table_id),
      sessionToken: randomUUID(),
      guestCount: dto.guest_count ?? 1,
      startedAt: new Date(),
      expiresAt: dto.expires_at ? new Date(dto.expires_at) : undefined,
      isActive: true,
    });

    return await this.repo.save(rec);
  }

  async findByToken(token: string): Promise<SessionEntity> {
    const rec = await this.repo.findOne({ where: { sessionToken: token } });

    if (!rec) {
      throw new NotFoundException({
        details: { search_token: token }
      });
    }

    return rec;
  }

  async endSessionByToken(token: string): Promise<{ message: string }> {
    const session = await this.repo.findOne({ where: { sessionToken: token } });

    if (!session) {
      throw new NotFoundException({
        details: { search_token: token }
      });
    }

    if (!session.isActive) {
      throw new BadRequestException({
        details: { closedAt: session.closedAt },
      });
    }

    session.isActive = false;
    session.closedAt = new Date();
    await this.repo.save(session);

    return { message: `Session ${token} closed successfully` };
  }
}
