import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderStatusHistoryDto {
	@IsNotEmpty()
	@IsString()
	order_id: string;

	@IsOptional()
	@IsString()
	order_item_id?: string;

	@IsOptional()
	@IsString()
	previous_status?: string;

	@IsNotEmpty()
	@IsString()
	new_status: string;

	@IsOptional()
	@IsString()
	changed_by_user_id?: string;

	@IsOptional()
	@IsString()
	changed_by_role?: string;

	@IsOptional()
	@IsString()
	notes?: string;

	@IsOptional()
	changed_at?: Date;
}
