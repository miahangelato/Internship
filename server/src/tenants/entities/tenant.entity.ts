import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Menu } from 'src/menus/entities/menu.entity';
import { MenuCategory } from 'src/menu_categories/entities/menu_category.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { SessionEntity } from 'src/session/entities/session.entity';
import { Table } from 'src/tables/entities/table.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100, nullable: true })
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
    default: 3000,
  })
  monthlyFee: number;

  @Column({ name: 'max_tables', type: 'int', default: 30 })
  maxTables: number;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  email?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // ==========================
  // 🔗 RELATIONS
  // ==========================

  @OneToMany(() => Menu, (menu) => menu.tenant)
  menus: Menu[];

  @OneToMany(() => MenuCategory, (cat) => cat.tenant)
  menuCategories: MenuCategory[];

  @OneToMany(() => Order, (order) => order.tenant)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.tenant)
  payments: Payment[];

  @OneToMany(() => SessionEntity, (session) => session.tenant)
  sessions: SessionEntity[];

  @OneToMany(() => Table, (table) => table.tenant)
  tables: Table[];
}
