import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly repo: Repository<Cart>,
  ) {}

  async create(dto: CreateCartDto): Promise<Cart> {
    const rec = this.repo.create({
      sessionId: String(dto.session_id),
      tenantId: String(dto.tenant_id),
      totalAmount: (dto.total_amount ?? 0).toFixed(2),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Cart;
  }

  async findAll(): Promise<Cart[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<Cart> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`Cart ${id} not found`);
    return r;
  }

  async update(id: number | string, dto: UpdateCartDto): Promise<Cart> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.total_amount !== undefined ? { totalAmount: dto.total_amount.toFixed(2) } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Cart;
  }

  async remove(id: number | string): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`Cart ${id} not found`);
  }
}
