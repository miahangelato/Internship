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
import { Order } from '../../orders/entities/order.entity';
import { Menu } from '../../menus/entities/menu.entity';

@Entity({ name: 'order_items' })
@Index('idx_order_items_order', ['orderId'])
@Index('idx_order_items_status', ['orderId', 'status'])
@Index('idx_order_items_area', ['preparationArea', 'status'])
export class OrderItem {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'order_id', type: 'bigint' })
  orderId: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'menu_id', type: 'bigint' })
  menuId: string;

  @ManyToOne(() => Menu, (menu) => menu.orderItems, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @Column({ name: 'menu_name', length: 255 })
  menuName: string;

  @Column({ type: 'integer', default: 1 })
  quantity: number;

  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2, default: '0.00' })
  unitPrice: string;

  @Column({ name: 'subtotal', type: 'decimal', precision: 10, scale: 2, default: '0.00' })
  subtotal: string;

  @Column({ length: 20, default: 'pending' })
  status: string;

  @Column({ name: 'preparation_area', length: 50, default: 'kitchen' })
  preparationArea: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
