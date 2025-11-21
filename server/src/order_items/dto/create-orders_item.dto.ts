import { IsInt, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateOrdersItemDto {
	@IsNotEmpty()
	@IsString()
	order_id: string;

	@IsNotEmpty()
	@IsString()
	menu_id: string;

	@IsNotEmpty()
	@IsString()
	menu_name: string;

	@IsOptional()
	@IsInt()
	quantity?: number = 1;

	@IsOptional()
	@IsNumber()
	unit_price?: number = 0;

	@IsOptional()
	@IsNumber()
	subtotal?: number = 0;

	@IsOptional()
	@IsString()
	status?: string = 'pending';

	@IsOptional()
	@IsString()
	preparation_area?: string = 'kitchen';

	@IsOptional()
	@IsString()
	notes?: string;
}
