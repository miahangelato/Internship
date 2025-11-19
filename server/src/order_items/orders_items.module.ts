import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersItemsService } from './orders_items.service';
import { OrdersItemsController } from './orders_items.controller';
import { OrderItem } from './entities/orders_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrdersItemsController],
  providers: [OrdersItemsService],
  exports: [OrdersItemsService],
})
export class OrdersItemsModule {}
