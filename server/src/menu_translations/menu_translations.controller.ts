import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuTranslationsService } from './menu_translations.service';
import { CreateMenuTranslationDto } from './dto/create-menu_translation.dto';
import { UpdateMenuTranslationDto } from './dto/update-menu_translation.dto';
import { ApiResponse } from '../common/api-response';

@Controller('menu-translations')
export class MenuTranslationsController {
  constructor(private readonly menuTranslationsService: MenuTranslationsService) {}

  @Post()
  async create(@Body() createMenuTranslationDto: CreateMenuTranslationDto) {
    const data = await this.menuTranslationsService.create(createMenuTranslationDto);
    return ApiResponse.success(data);
  }

  @Get()
  async findAll() {
    const data = await this.menuTranslationsService.findAll();
    return ApiResponse.success(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.menuTranslationsService.findOne(id);
    return ApiResponse.success(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuTranslationDto: UpdateMenuTranslationDto
  ) {
    const data = await this.menuTranslationsService.update(id, updateMenuTranslationDto);
    return ApiResponse.success(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.menuTranslationsService.remove(id);
    return ApiResponse.success(data);
  }
}
