import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdersItemDto } from './dto/create-orders_item.dto';
import { UpdateOrdersItemDto } from './dto/update-orders_item.dto';
import { OrderItem } from './entities/orders_item.entity';

@Injectable()
export class OrdersItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repo: Repository<OrderItem>,
  ) {}

  async create(dto: CreateOrdersItemDto): Promise<OrderItem> {
    const rec = this.repo.create({
      orderId: String(dto.order_id),
      menuId: String(dto.menu_id),
      menuName: dto.menu_name,
      quantity: dto.quantity ?? 1,
      unitPrice: (dto.unit_price ?? 0).toFixed(2),
      subtotal: (dto.subtotal ?? 0).toFixed(2),
      status: dto.status ?? 'pending',
      preparationArea: dto.preparation_area ?? 'kitchen',
      notes: dto.notes,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as OrderItem;
  }

  async findAll(): Promise<OrderItem[]> {
    return this.repo.find();
  }

  async findOne(id: string | number): Promise<OrderItem> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`OrderItem ${id} not found`);
    return r;
  }

  async update(id: string | number, dto: UpdateOrdersItemDto): Promise<OrderItem> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.menu_name !== undefined ? { menuName: dto.menu_name } : {}),
      ...(dto.quantity !== undefined ? { quantity: dto.quantity } : {}),
      ...(dto.unit_price !== undefined ? { unitPrice: (dto.unit_price as any).toFixed(2) } : {}),
      ...(dto.subtotal !== undefined ? { subtotal: (dto.subtotal as any).toFixed(2) } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      ...(dto.preparation_area !== undefined ? { preparationArea: dto.preparation_area } : {}),
      ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as OrderItem;
  }

  async remove(id: string | number): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`OrderItem ${id} not found`);
  }
}
