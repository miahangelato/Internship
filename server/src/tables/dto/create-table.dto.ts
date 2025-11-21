import { IsNotEmpty, IsOptional, IsString, IsInt, IsBoolean, IsNumberString } from 'class-validator';

export class CreateTableDto {
	@IsNotEmpty()
	@IsNumberString()
	tenant_id: string;

	@IsNotEmpty()
	@IsString()
	table_number: string;

	@IsOptional()
	@IsString()
	table_type?: string = 'table';

	@IsOptional()
	@IsInt()
	capacity?: number = 4;

	@IsOptional()
	@IsString()
	qr_code_url?: string;

	@IsOptional()
	@IsString()
	qr_code_data?: string;

	@IsOptional()
	@IsBoolean()
	is_active?: boolean = true;
}
