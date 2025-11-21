import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuCategoriesService } from './menu_categories.service';
import { CreateMenuCategoryDto } from './dto/create-menu_category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu_category.dto';
import { ApiResponse } from '../common/api-response';

@Controller('menu-categories')
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Post()
  async create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    const data = await this.menuCategoriesService.create(createMenuCategoryDto);
    return ApiResponse.success(data);
  }

  @Get()
  async findAll() {
    const data = await this.menuCategoriesService.findAll();
    return ApiResponse.success(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.menuCategoriesService.findOne(id);
    return ApiResponse.success(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto
  ) {
    const data = await this.menuCategoriesService.update(id, updateMenuCategoryDto);
    return ApiResponse.success(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.menuCategoriesService.remove(id);
    return ApiResponse.success(data);
  }
}
