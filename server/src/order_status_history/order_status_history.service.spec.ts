import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatusHistoryService } from './order_status_history.service';
import { OrderStatusHistory } from './entities/order_status_history.entity';

describe('OrderStatusHistoryService', () => {
  let service: OrderStatusHistoryService;
  let repo: Partial<Record<keyof Repository<OrderStatusHistory>, jest.Mock>>;

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
        OrderStatusHistoryService,
        { provide: getRepositoryToken(OrderStatusHistory), useValue: repo },
      ],
    }).compile();

    service = module.get<OrderStatusHistoryService>(OrderStatusHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
