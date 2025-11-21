import { Test, TestingModule } from '@nestjs/testing';
import { MenuCategoriesService } from './menu_categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MenuCategory } from './entities/menu_category.entity';

describe('MenuCategoriesService', () => {
  let service: MenuCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuCategoriesService,
        {
          provide: getRepositoryToken(MenuCategory),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MenuCategoriesService>(MenuCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
