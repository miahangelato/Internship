import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { Table as TableEntity } from '../../tables/entities/table.entity';
import { Session } from '../../session/entities/session.entity';
import { Order } from '../../orders/entities/order.entity';
import { Payment } from '../../payments/entities/payment.entity'; // create when ready

@Entity({ name: 'tenants' })
@Index('idx_tenants_status', ['subscriptionStatus'])
export class Tenant {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100, nullable: true, unique: true })
  subdomain?: string;

  @Column({ name: 'default_language', length: 10, default: 'ja' })
  defaultLanguage: string;

  @Column({ length: 10, default: 'THB' })
  currency: string;

  @Column({ length: 50, default: 'Asia/Bangkok' })
  timezone: string;

  @Column({ name: 'subscription_plan', length: 50, default: 'basic' })
  subscriptionPlan: string;

  @Column({ name: 'subscription_status', length: 20, default: 'active' })
  subscriptionStatus: string;

  @Column({
    name: 'monthly_fee',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: '3000',
  })
  monthlyFee: string;

  @Column({ name: 'max_tables', type: 'integer', default: 30 })
  maxTables: number;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  email?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.tenant)
  users: User[];

  @OneToMany(() => Menu, (menu) => menu.tenant)
  menus: Menu[];

  @OneToMany(() => TableEntity, (table) => table.tenant)
  tables: TableEntity[];

  @OneToMany(() => Session, (session) => session.tenant)
  sessions: Session[];

  @OneToMany(() => Order, (order) => order.tenant)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.tenant)
  payments: Payment[];
}
