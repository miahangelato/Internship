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
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { MenuCategory } from '../../menu_categories/entities/menu_category.entity';
import { OrderItem } from '../../order_items/entities/orders_item.entity';

@Entity({ name: 'menus' })
@Index('idx_menus_tenant_category', ['tenantId', 'categoryId'])
@Index('idx_menus_availability', ['tenantId', 'isAvailable', 'isActive'])
export class Menu {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'tenant_id', type: 'bigint' })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.menus, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'category_id', type: 'bigint', nullable: true })
  categoryId?: string;

  @ManyToOne(() => MenuCategory, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: MenuCategory;

  @Column({ length: 100, nullable: true })
  sku?: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: '0.00' })
  price: string;

  @Column({ name: 'image_url', length: 500, nullable: true })
  imageUrl?: string;

  @Column({ name: 'allergen_info', type: 'text', nullable: true })
  allergenInfo?: string;

  @Column({ name: 'preparation_area', length: 50, default: 'kitchen' })
  preparationArea: string;

  @Column({ name: 'preparation_time_minutes', type: 'integer', default: 15 })
  preparationTimeMinutes: number;

  @Column({ name: 'is_available', default: true })
  isAvailable: boolean;

  @Column({ name: 'stock_quantity', type: 'integer', nullable: true })
  stockQuantity?: number;

  @Column({ name: 'display_order', type: 'integer', default: 0 })
  displayOrder: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.menu)
  orderItems: OrderItem[];
}
