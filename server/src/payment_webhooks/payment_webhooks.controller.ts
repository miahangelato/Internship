import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentWebhooksService } from './payment_webhooks.service';
import { CreatePaymentWebhookDto } from './dto/create-payment_webhook.dto';
import { UpdatePaymentWebhookDto } from './dto/update-payment_webhook.dto';

@Controller('payment-webhooks')
export class PaymentWebhooksController {
  constructor(private readonly paymentWebhooksService: PaymentWebhooksService) {}

  @Post()
  create(@Body() createPaymentWebhookDto: CreatePaymentWebhookDto) {
    return this.paymentWebhooksService.create(createPaymentWebhookDto);
  }

  @Get()
  findAll() {
    return this.paymentWebhooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentWebhooksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentWebhookDto: UpdatePaymentWebhookDto) {
    return this.paymentWebhooksService.update(id, updatePaymentWebhookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentWebhooksService.remove(id);
  }
}
