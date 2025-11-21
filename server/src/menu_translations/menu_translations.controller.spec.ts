import { Test, TestingModule } from '@nestjs/testing';
import { MenuTranslationsController } from './menu_translations.controller';
import { MenuTranslationsService } from './menu_translations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MenuTranslation } from './entities/menu_translation.entity';

describe('MenuTranslationsController', () => {
  let controller: MenuTranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuTranslationsController],
      providers: [
        MenuTranslationsService,
        {
          provide: getRepositoryToken(MenuTranslation),
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

    controller = module.get<MenuTranslationsController>(MenuTranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
