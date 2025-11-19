import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuTranslationDto } from './create-menu_translation.dto';

export class UpdateMenuTranslationDto extends PartialType(CreateMenuTranslationDto) {}
