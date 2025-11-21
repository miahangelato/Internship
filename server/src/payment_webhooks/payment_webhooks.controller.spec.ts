import { Test, TestingModule } from '@nestjs/testing';
import { PaymentWebhooksController } from './payment_webhooks.controller';
import { PaymentWebhooksService } from './payment_webhooks.service';

describe('PaymentWebhooksController', () => {
  let controller: PaymentWebhooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentWebhooksController],
      providers: [PaymentWebhooksService],
    }).compile();

    controller = module.get<PaymentWebhooksController>(PaymentWebhooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
