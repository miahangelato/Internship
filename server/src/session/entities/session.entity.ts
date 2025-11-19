import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Table as TableEntity } from '../../tables/entities/table.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity({ name: 'sessions' })
@Unique('uq_sessions_token', ['sessionToken'])
@Index('idx_sessions_tenant_table', ['tenantId', 'tableId'])
@Index('idx_sessions_token', ['sessionToken'])
@Index('idx_sessions_active', ['isActive', 'expiresAt'])
export class Session {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'tenant_id', type: 'bigint' })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'table_id', type: 'bigint' })
  tableId: string;

  @ManyToOne(() => TableEntity, (table) => table.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'table_id' })
  table: TableEntity;

  @Column({ name: 'session_token', length: 255 })
  sessionToken: string;

  @Column({ name: 'guest_count', type: 'integer', default: 1 })
  guestCount: number;

  @Column({ name: 'started_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.session)
  orders: Order[];
}
