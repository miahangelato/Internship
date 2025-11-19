import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private readonly repo: Repository<Table>,
  ) {}

  async create(dto: CreateTableDto): Promise<Table> {
    const rec = this.repo.create({
      tenantId: String(dto.tenant_id),
      tableNumber: dto.table_number,
      tableType: dto.table_type ?? 'table',
      capacity: dto.capacity ?? 4,
      qrCodeUrl: dto.qr_code_url,
      qrCodeData: dto.qr_code_data,
      isActive: dto.is_active ?? true,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Table;
  }

  async findAll(): Promise<Table[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<Table> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`Table ${id} not found`);
    return r;
  }

  async update(id: number | string, dto: UpdateTableDto): Promise<Table> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.table_number !== undefined ? { tableNumber: dto.table_number } : {}),
      ...(dto.table_type !== undefined ? { tableType: dto.table_type } : {}),
      ...(dto.capacity !== undefined ? { capacity: dto.capacity } : {}),
      ...(dto.qr_code_url !== undefined ? { qrCodeUrl: dto.qr_code_url } : {}),
      ...(dto.qr_code_data !== undefined ? { qrCodeData: dto.qr_code_data } : {}),
      ...(dto.is_active !== undefined ? { isActive: dto.is_active } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Table;
  }

  async remove(id: number | string): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`Table ${id} not found`);
  }
}
