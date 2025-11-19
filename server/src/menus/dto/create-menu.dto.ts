import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsNumberString,
	IsInt,
	IsBoolean,
} from 'class-validator';

export class CreateMenuDto {
	@IsNotEmpty()
	@IsNumberString()
	tenant_id: string;

	@IsOptional()
	@IsNumberString()
	category_id?: string;

	@IsOptional()
	@IsString()
	sku?: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsNumberString()
	price?: string = '0.00';

	@IsOptional()
	@IsString()
	image_url?: string;

	@IsOptional()
	@IsString()
	allergen_info?: string;

	@IsOptional()
	@IsString()
	preparation_area?: string = 'kitchen';

	@IsOptional()
	@IsInt()
	preparation_time_minutes?: number = 15;

	@IsOptional()
	@IsBoolean()
	is_available?: boolean = true;

	@IsOptional()
	@IsInt()
	stock_quantity?: number;

	@IsOptional()
	@IsInt()
	display_order?: number = 0;

	@IsOptional()
	@IsBoolean()
	is_active?: boolean = true;
}
