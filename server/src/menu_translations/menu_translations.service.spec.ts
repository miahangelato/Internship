import { Test, TestingModule } from '@nestjs/testing';
import { MenuTranslationsService } from './menu_translations.service';

describe('MenuTranslationsService', () => {
  let service: MenuTranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuTranslationsService],
    }).compile();

    service = module.get<MenuTranslationsService>(MenuTranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
