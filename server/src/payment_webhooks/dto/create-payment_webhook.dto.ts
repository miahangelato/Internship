import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreatePaymentWebhookDto {
	@IsOptional()
	@IsString()
	payment_id?: string;

	@IsNotEmpty()
	@IsString()
	webhook_event: string;

	// raw JSON payload from provider
	@IsNotEmpty()
	payload: any;

	@IsOptional()
	headers?: any;

	@IsOptional()
	@IsString()
	signature?: string;

	@IsOptional()
	@IsBoolean()
	is_verified?: boolean = false;

	@IsOptional()
	processed_at?: Date;
}
