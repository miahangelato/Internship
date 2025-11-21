import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuTranslationDto } from './dto/create-menu_translation.dto';
import { UpdateMenuTranslationDto } from './dto/update-menu_translation.dto';
import { MenuTranslation } from './entities/menu_translation.entity';

@Injectable()
export class MenuTranslationsService {
  constructor(
    @InjectRepository(MenuTranslation)
    private readonly repo: Repository<MenuTranslation>,
  ) {}

  async create(dto: CreateMenuTranslationDto): Promise<MenuTranslation> {
    if (!dto.menu_id || !dto.language_code || !dto.name) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation error',
        details: { received: dto },
      });
    }

    const existing = await this.repo.findOne({
      where: {
        menuId: String(dto.menu_id),
        languageCode: dto.language_code,
      } as any,
    });

    if (existing) {
      throw new ConflictException({
        code: 'DUPLICATE_RESOURCE',
        message: 'Duplicate resource',
        details: {
          menu_id: dto.menu_id,
          language_code: dto.language_code,
        },
      });
    }

    const rec: MenuTranslation = this.repo.create({
      menuId: String(dto.menu_id),
      languageCode: dto.language_code,
      name: dto.name,
      description: dto.description,
    });

    return await this.repo.save(rec);
  }

  async findAll(): Promise<MenuTranslation[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<MenuTranslation> {
    const rec = await this.repo.findOne({
      where: { id: String(id) } as any,
    });

    if (!rec) {
      throw new NotFoundException({
        code: 'RESOURCE_NOT_FOUND',
        message: 'Resource not found',
        details: { id },
      });
    }

    return rec;
  }

  async update(
    id: number | string,
    dto: UpdateMenuTranslationDto,
  ): Promise<MenuTranslation> {
    const rec = await this.findOne(id);

    if (dto.language_code) {
      const existing = await this.repo.findOne({
        where: {
          menuId: rec.menuId,
          languageCode: dto.language_code,
        } as any,
      });

      if (existing && existing.id !== rec.id) {
        throw new ConflictException({
          code: 'DUPLICATE_RESOURCE',
          message: 'Duplicate resource',
          details: {
            menu_id: rec.menuId,
            language_code: dto.language_code,
          },
        });
      }
    }

    Object.assign(rec, {
      ...(dto.language_code !== undefined
        ? { languageCode: dto.language_code }
        : {}),
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.description !== undefined
        ? { description: dto.description }
        : {}),
    });

    return await this.repo.save(rec);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.repo.delete(String(id));

    if (result.affected === 0) {
      throw new NotFoundException({
        code: 'RESOURCE_NOT_FOUND',
        message: 'Resource not found',
        details: { id },
      });
    }
  }
}
