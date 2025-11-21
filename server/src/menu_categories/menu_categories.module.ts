import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategoriesService } from './menu_categories.service';
import { MenuCategoriesController } from './menu_categories.controller';
import { MenuCategory } from './entities/menu_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory])],
  controllers: [MenuCategoriesController],
  providers: [MenuCategoriesService],
  exports: [MenuCategoriesService],
})
export class MenuCategoriesModule {}
