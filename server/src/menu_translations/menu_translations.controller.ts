import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuTranslationsService } from './menu_translations.service';
import { CreateMenuTranslationDto } from './dto/create-menu_translation.dto';
import { UpdateMenuTranslationDto } from './dto/update-menu_translation.dto';

@Controller('menu-translations')
export class MenuTranslationsController {
  constructor(private readonly menuTranslationsService: MenuTranslationsService) {}

  @Post()
  create(@Body() createMenuTranslationDto: CreateMenuTranslationDto) {
    return this.menuTranslationsService.create(createMenuTranslationDto);
  }

  @Get()
  findAll() {
    return this.menuTranslationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuTranslationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuTranslationDto: UpdateMenuTranslationDto) {
    return this.menuTranslationsService.update(id, updateMenuTranslationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuTranslationsService.remove(id);
  }
}
