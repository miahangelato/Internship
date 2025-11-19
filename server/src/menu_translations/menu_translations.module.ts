import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuTranslationsService } from './menu_translations.service';
import { MenuTranslationsController } from './menu_translations.controller';
import { MenuTranslation } from './entities/menu_translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuTranslation])],
  controllers: [MenuTranslationsController],
  providers: [MenuTranslationsService],
  exports: [MenuTranslationsService],
})
export class MenuTranslationsModule {}
