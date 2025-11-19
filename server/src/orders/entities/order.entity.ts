import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Session } from '../../session/entities/session.entity';
import { Table as TableEntity } from '../../tables/entities/table.entity';
import { OrderItem } from '../../order_items/entities/orders_item.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity({ name: 'orders' })
@Unique('uq_orders_tenant_order_number', ['tenantId', 'orderNumber'])
@Index('idx_orders_tenant_status', ['tenantId', 'status', 'orderedAt'])
@Index('idx_orders_session', ['sessionId'])
@Index('idx_orders_table', ['tableId', 'orderedAt'])
@Index('idx_orders_payment', ['tenantId', 'paymentStatus'])
export class Order {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'tenant_id', type: 'bigint' })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'session_id', type: 'bigint' })
  sessionId: string;

  @ManyToOne(() => Session, (session) => session.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column({ name: 'table_id', type: 'bigint' })
  tableId: string;

  @ManyToOne(() => TableEntity, (table) => table.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'table_id' })
  table: TableEntity;

  @Column({ name: 'order_number', length: 50 })
  orderNumber: string;

  @Column({ name: 'guest_count', type: 'integer', default: 1 })
  guestCount: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2, default: '0.00' })
  totalAmount: string;

  @Column({ length: 20, default: 'pending' })
  status: string;

  @Column({ name: 'payment_status', length: 20, default: 'unpaid' })
  paymentStatus: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'ordered_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderedAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt?: Date;

  @Column({ type: 'integer', default: 0 })
  version: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
