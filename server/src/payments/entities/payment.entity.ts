import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity({ name: 'payments' })
@Index('idx_payments_tenant_order', ['tenantId', 'orderId'])
@Index('idx_payments_external_txn', ['externalTransactionId'])
@Index('idx_payments_status', ['status'])
export class Payment {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'tenant_id', type: 'bigint' })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'order_id', type: 'bigint' })
  orderId: string;

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'payment_method', length: 50, default: 'cash' })
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: '0.00' })
  amount: string;

  @Column({ length: 20, default: 'pending' })
  status: string;

  @Column({ name: 'external_transaction_id', length: 255, nullable: true })
  externalTransactionId?: string;

  @Column({ name: 'payment_details', type: 'jsonb', nullable: true })
  paymentDetails?: any;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
