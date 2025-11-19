import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentWebhookDto } from './dto/create-payment_webhook.dto';
import { UpdatePaymentWebhookDto } from './dto/update-payment_webhook.dto';
import { PaymentWebhook } from './entities/payment_webhook.entity';

@Injectable()
export class PaymentWebhooksService {
  constructor(
    @InjectRepository(PaymentWebhook)
    private readonly repo: Repository<PaymentWebhook>,
  ) {}

  async create(dto: CreatePaymentWebhookDto): Promise<PaymentWebhook> {
    const rec = this.repo.create({
      paymentId: dto.payment_id ? String(dto.payment_id) : undefined,
      webhookEvent: dto.webhook_event,
      payload: dto.payload,
      headers: dto.headers,
      signature: dto.signature,
      isVerified: dto.is_verified ?? false,
      processedAt: dto.processed_at,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as PaymentWebhook;
  }

  async findAll(): Promise<PaymentWebhook[]> {
    return this.repo.find();
  }

  async findOne(id: string | number): Promise<PaymentWebhook> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`PaymentWebhook ${id} not found`);
    return r;
  }

  async update(id: string | number, dto: UpdatePaymentWebhookDto): Promise<PaymentWebhook> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.payment_id !== undefined ? { paymentId: String(dto.payment_id) } : {}),
      ...(dto.webhook_event !== undefined ? { webhookEvent: dto.webhook_event } : {}),
      ...(dto.payload !== undefined ? { payload: dto.payload } : {}),
      ...(dto.headers !== undefined ? { headers: dto.headers } : {}),
      ...(dto.signature !== undefined ? { signature: dto.signature } : {}),
      ...(dto.is_verified !== undefined ? { isVerified: dto.is_verified } : {}),
      ...(dto.processed_at !== undefined ? { processedAt: dto.processed_at } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as PaymentWebhook;
  }

  async remove(id: string | number): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`PaymentWebhook ${id} not found`);
  }
}
