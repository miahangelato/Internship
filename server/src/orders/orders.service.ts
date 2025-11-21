import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const rec = this.repo.create({
      tenantId: String(dto.tenant_id),
      sessionId: String(dto.session_id),
      tableId: String(dto.table_id),
      orderNumber: dto.order_number,
      guestCount: dto.guest_count ?? 1,
      totalAmount: (dto.total_amount ?? 0).toFixed(2),
      status: dto.status ?? 'pending',
      paymentStatus: dto.payment_status ?? 'unpaid',
      notes: dto.notes,
      orderedAt: dto.ordered_at,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Order;
  }

  async findAll(): Promise<Order[]> {
    return this.repo.find({ relations: ['items', 'payments'] });
  }

  async findOne(id: string | number): Promise<Order> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any, relations: ['items', 'payments'] });
    if (!r) throw new NotFoundException(`Order ${id} not found`);
    return r;
  }

  async update(id: string | number, dto: UpdateOrderDto): Promise<Order> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.order_number !== undefined ? { orderNumber: dto.order_number } : {}),
      ...(dto.guest_count !== undefined ? { guestCount: dto.guest_count } : {}),
      ...(dto.total_amount !== undefined ? { totalAmount: dto.total_amount.toFixed(2) } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      ...(dto.payment_status !== undefined ? { paymentStatus: dto.payment_status } : {}),
      ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
      ...(dto.completed_at !== undefined ? { completedAt: dto.completed_at } : {}),
    } as any);
    // optimistic version bump
    (rec as any).version = (rec as any).version + 1 || 1;
    const saved = await this.repo.save(rec);
    return saved as unknown as Order;
  }

  async remove(id: string | number): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`Order ${id} not found`);
  }
}
