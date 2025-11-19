import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentWebhooksService } from './payment_webhooks.service';
import { PaymentWebhooksController } from './payment_webhooks.controller';
import { PaymentWebhook } from './entities/payment_webhook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentWebhook])],
  controllers: [PaymentWebhooksController],
  providers: [PaymentWebhooksService],
  exports: [PaymentWebhooksService],
})
export class PaymentWebhooksModule {}
