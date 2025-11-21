import { IsNotEmpty, IsNumberString, IsOptional, IsNumber } from 'class-validator';

export class CreateCartDto {
	@IsNotEmpty()
	@IsNumberString()
	session_id: string;

	@IsNotEmpty()
	@IsNumberString()
	tenant_id: string;

	@IsOptional()
	@IsNumber()
	total_amount?: number = 0;
}
