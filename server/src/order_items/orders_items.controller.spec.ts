import { Test, TestingModule } from '@nestjs/testing';
import { OrdersItemsController } from './orders_items.controller';
import { OrdersItemsService } from './orders_items.service';

describe('OrdersItemsController', () => {
  let controller: OrdersItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersItemsController],
      providers: [
        { provide: OrdersItemsService, useValue: { create: jest.fn(), findAll: jest.fn(), findOne: jest.fn(), update: jest.fn(), remove: jest.fn() } },
      ],
    }).compile();

    controller = module.get<OrdersItemsController>(OrdersItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
