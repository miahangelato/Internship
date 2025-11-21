import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersItemsService } from './orders_items.service';
import { OrderItem } from './entities/orders_item.entity';

describe('OrdersItemsService', () => {
  let service: OrdersItemsService;
  let repo: Partial<Record<keyof Repository<OrderItem>, jest.Mock>>;

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
        OrdersItemsService,
        { provide: getRepositoryToken(OrderItem), useValue: repo },
      ],
    }).compile();

    service = module.get<OrdersItemsService>(OrdersItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
