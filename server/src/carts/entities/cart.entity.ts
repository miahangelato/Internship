import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Session } from '../../session/entities/session.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity({ name: 'carts' })
@Unique('uq_carts_session', ['sessionId'])
@Index('idx_carts_tenant', ['tenantId'])
export class Cart {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'session_id', type: 'bigint' })
  sessionId: string;

  @ManyToOne(() => Session, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column({ name: 'tenant_id', type: 'bigint' })
  tenantId: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2, default: '0.00' })
  totalAmount: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

