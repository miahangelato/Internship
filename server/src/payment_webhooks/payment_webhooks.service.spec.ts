import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentWebhooksService } from './payment_webhooks.service';
import { PaymentWebhook } from './entities/payment_webhook.entity';

describe('PaymentWebhooksService', () => {
  let service: PaymentWebhooksService;
  let repo: Partial<Record<keyof Repository<PaymentWebhook>, jest.Mock>>;

  beforeEach(async () => {
    repo = {
      find: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockImplementation((d) => d),
      save: jest.fn().mockImplementation((d) => Promise.resolve({ id: '1', ...d })),
      findOne: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentWebhooksService,
        { provide: getRepositoryToken(PaymentWebhook), useValue: repo },
      ],
    }).compile();

    service = module.get<PaymentWebhooksService>(PaymentWebhooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
