import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiResponse } from '../common/api-response';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    const data = await this.menusService.create(createMenuDto);
    return ApiResponse.success(data);
  }

  @Get()
  async findAll() {
    const data = await this.menusService.findAll();
    return ApiResponse.success(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.menusService.findOne(id);
    return ApiResponse.success(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto
  ) {
    const data = await this.menusService.update(id, updateMenuDto);
    return ApiResponse.success(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.menusService.remove(id);
    return ApiResponse.success(data);
  }
}
