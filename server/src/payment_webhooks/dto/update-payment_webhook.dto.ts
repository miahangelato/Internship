import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentWebhookDto } from './create-payment_webhook.dto';

export class UpdatePaymentWebhookDto extends PartialType(CreatePaymentWebhookDto) {}
