import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly repo: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const rec = this.repo.create({
      tenantId: String(dto.tenant_id),
      orderId: String(dto.order_id),
      paymentMethod: dto.payment_method ?? 'cash',
      amount: (dto.amount ?? 0).toFixed(2),
      status: dto.status ?? 'pending',
      externalTransactionId: dto.external_transaction_id,
      paymentDetails: dto.payment_details,
      paidAt: dto.paid_at,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Payment;
  }

  async findAll(): Promise<Payment[]> {
    return this.repo.find();
  }

  async findOne(id: string | number): Promise<Payment> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`Payment ${id} not found`);
    return r;
  }

  async update(id: string | number, dto: UpdatePaymentDto): Promise<Payment> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.payment_method !== undefined ? { paymentMethod: dto.payment_method } : {}),
      ...(dto.amount !== undefined ? { amount: (dto.amount as any).toFixed(2) } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      ...(dto.external_transaction_id !== undefined ? { externalTransactionId: dto.external_transaction_id } : {}),
      ...(dto.payment_details !== undefined ? { paymentDetails: dto.payment_details } : {}),
      ...(dto.paid_at !== undefined ? { paidAt: dto.paid_at } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Payment;
  }

  async remove(id: string | number): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`Payment ${id} not found`);
  }
}
