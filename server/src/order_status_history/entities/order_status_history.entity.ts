import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { OrderItem } from '../../order_items/entities/orders_item.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'order_status_history' })
@Index('idx_order_status_history_order', ['orderId', 'changedAt'])
@Index('idx_order_status_history_item', ['orderItemId'])
export class OrderStatusHistory {
	@PrimaryGeneratedColumn('increment', { type: 'bigint' })
	id: string;

	@Column({ name: 'order_id', type: 'bigint' })
	orderId: string;

	@ManyToOne(() => Order, (order) => (order as any).items, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'order_id' })
	order: Order;

	@Column({ name: 'order_item_id', type: 'bigint', nullable: true })
	orderItemId?: string;

	@ManyToOne(() => OrderItem, (item) => (item as any).order, { onDelete: 'CASCADE', nullable: true })
	@JoinColumn({ name: 'order_item_id' })
	orderItem?: OrderItem;

	@Column({ name: 'previous_status', length: 20, nullable: true })
	previousStatus?: string;

	@Column({ name: 'new_status', length: 20 })
	newStatus: string;

	@Column({ name: 'changed_by_user_id', type: 'bigint', nullable: true })
	changedByUserId?: string;

	@ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
	@JoinColumn({ name: 'changed_by_user_id' })
	changedByUser?: User;

	@Column({ name: 'changed_by_role', length: 50, nullable: true })
	changedByRole?: string;

	@Column({ type: 'text', nullable: true })
	notes?: string;

	@Column({ name: 'changed_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	changedAt: Date;
}
