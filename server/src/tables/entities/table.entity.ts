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
import { SessionEntity } from '../../session/entities/session.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity({ name: 'tables' })
@Index('idx_tables_tenant', ['tenantId'])
@Unique('uq_tables_tenant_number', ['tenantId', 'tableNumber'])
export class Table {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'tenant_id', type: 'bigint' })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.tables, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'table_number', length: 50 })
  tableNumber: string;

  @Column({ name: 'table_type', length: 20, default: 'table' })
  tableType: string;

  @Column({ type: 'integer', default: 4 })
  capacity: number;

  @Column({ name: 'qr_code_url', length: 500, nullable: true })
  qrCodeUrl?: string;

  @Column({ name: 'qr_code_data', type: 'text', nullable: true })
  qrCodeData?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => SessionEntity, (session) => session.table)
  sessions: SessionEntity[];

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
}
