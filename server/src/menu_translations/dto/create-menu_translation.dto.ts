import { IsNotEmpty, IsOptional, IsString, IsNumberString } from 'class-validator';

export class CreateMenuTranslationDto {
	@IsNotEmpty()
	@IsNumberString()
	menu_id: string;

	@IsNotEmpty()
	@IsString()
	language_code: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;
}
