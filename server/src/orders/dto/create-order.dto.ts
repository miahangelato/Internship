import { IsInt, IsNotEmpty, IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
	@IsNotEmpty()
	@IsString()
	tenant_id: string;

	@IsNotEmpty()
	@IsString()
	session_id: string;

	@IsNotEmpty()
	@IsString()
	table_id: string;

	@IsNotEmpty()
	@IsString()
	order_number: string;

	@IsOptional()
	@IsInt()
	guest_count?: number = 1;

	@IsOptional()
	@IsNumber()
	total_amount?: number = 0;

	@IsOptional()
	@IsString()
	status?: string = 'pending';

	@IsOptional()
	@IsString()
	payment_status?: string = 'unpaid';

	@IsOptional()
	@IsString()
	notes?: string;

	@IsOptional()
	ordered_at?: Date;

	@IsOptional()
	completed_at?: Date;
}
