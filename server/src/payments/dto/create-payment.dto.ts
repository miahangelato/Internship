import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto {
	@IsNotEmpty()
	@IsString()
	tenant_id: string;

	@IsNotEmpty()
	@IsString()
	order_id: string;

	@IsOptional()
	@IsString()
	payment_method?: string = 'cash';

	@IsOptional()
	@IsNumber()
	amount?: number = 0;

	@IsOptional()
	@IsString()
	status?: string = 'pending';

	@IsOptional()
	@IsString()
	external_transaction_id?: string;

	@IsOptional()
	payment_details?: any;

	@IsOptional()
	paid_at?: Date;
}
