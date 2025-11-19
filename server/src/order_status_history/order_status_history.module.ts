import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusHistoryService } from './order_status_history.service';
import { OrderStatusHistoryController } from './order_status_history.controller';
import { OrderStatusHistory } from './entities/order_status_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusHistory])],
  controllers: [OrderStatusHistoryController],
  providers: [OrderStatusHistoryService],
  exports: [OrderStatusHistoryService],
})
export class OrderStatusHistoryModule {}
