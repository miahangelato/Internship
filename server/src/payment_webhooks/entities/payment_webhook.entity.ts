import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

@Entity({ name: 'payment_webhooks' })
@Index('idx_payment_webhooks_payment', ['paymentId'])
@Index('idx_payment_webhooks_event', ['webhookEvent', 'createdAt'])
export class PaymentWebhook {
	@PrimaryGeneratedColumn('increment', { type: 'bigint' })
	id: string;

	@Column({ name: 'payment_id', type: 'bigint', nullable: true })
	paymentId?: string;

	@ManyToOne(() => Payment, (p) => (p as any).webhooks, { onDelete: 'SET NULL', nullable: true })
	@JoinColumn({ name: 'payment_id' })
	payment?: Payment;

	@Column({ name: 'webhook_event', length: 100 })
	webhookEvent: string;

	@Column({ name: 'payload', type: 'jsonb' })
	payload: any;

	@Column({ name: 'headers', type: 'jsonb', nullable: true })
	headers?: any;

	@Column({ length: 500, nullable: true })
	signature?: string;

	@Column({ name: 'is_verified', type: 'boolean', default: false })
	isVerified: boolean;

	@Column({ name: 'processed_at', type: 'timestamp', nullable: true })
	processedAt?: Date;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;
}
