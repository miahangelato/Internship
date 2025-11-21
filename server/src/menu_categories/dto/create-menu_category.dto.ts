import { IsNotEmpty, IsOptional, IsString, IsNumberString, IsInt, IsBoolean } from 'class-validator';

export class CreateMenuCategoryDto {
	@IsNotEmpty()
	@IsNumberString()
	tenant_id: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsInt()
	display_order?: number = 0;

	@IsOptional()
	@IsBoolean()
	is_active?: boolean = true;
}
