import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderStatusHistoryDto } from './dto/create-order_status_history.dto';
import { UpdateOrderStatusHistoryDto } from './dto/update-order_status_history.dto';
import { OrderStatusHistory } from './entities/order_status_history.entity';

@Injectable()
export class OrderStatusHistoryService {
  constructor(
    @InjectRepository(OrderStatusHistory)
    private readonly repo: Repository<OrderStatusHistory>,
  ) {}

  async create(dto: CreateOrderStatusHistoryDto): Promise<OrderStatusHistory> {
    const rec = this.repo.create({
      orderId: String(dto.order_id),
      orderItemId: dto.order_item_id ? String(dto.order_item_id) : undefined,
      previousStatus: dto.previous_status,
      newStatus: dto.new_status,
      changedByUserId: dto.changed_by_user_id ? String(dto.changed_by_user_id) : undefined,
      changedByRole: dto.changed_by_role,
      notes: dto.notes,
      changedAt: dto.changed_at,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as OrderStatusHistory;
  }

  async findAll(): Promise<OrderStatusHistory[]> {
    return this.repo.find();
  }

  async findOne(id: string | number): Promise<OrderStatusHistory> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`OrderStatusHistory ${id} not found`);
    return r;
  }

  async update(id: string | number, dto: UpdateOrderStatusHistoryDto): Promise<OrderStatusHistory> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.previous_status !== undefined ? { previousStatus: dto.previous_status } : {}),
      ...(dto.new_status !== undefined ? { newStatus: dto.new_status } : {}),
      ...(dto.changed_by_user_id !== undefined ? { changedByUserId: String(dto.changed_by_user_id) } : {}),
      ...(dto.changed_by_role !== undefined ? { changedByRole: dto.changed_by_role } : {}),
      ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
      ...(dto.changed_at !== undefined ? { changedAt: dto.changed_at } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as OrderStatusHistory;
  }

  async remove(id: string | number): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`OrderStatusHistory ${id} not found`);
  }
}
