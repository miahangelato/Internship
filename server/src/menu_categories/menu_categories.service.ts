import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuCategoryDto } from './dto/create-menu_category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu_category.dto';
import { MenuCategory } from './entities/menu_category.entity';

@Injectable()
export class MenuCategoriesService {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly repo: Repository<MenuCategory>,
  ) {}

  async create(dto: CreateMenuCategoryDto): Promise<MenuCategory> {
    if (!dto.tenant_id || !dto.name) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation error',
        details: { received: dto },
      });
    }

    const existing = await this.repo.findOne({
      where: { tenantId: String(dto.tenant_id), name: dto.name },
    });

    if (existing) {
      throw new ConflictException({
        code: 'DUPLICATE_RESOURCE',
        message: 'Duplicate resource',
        details: { name: dto.name, tenant_id: dto.tenant_id },
      });
    }

    const rec: MenuCategory = this.repo.create({
      tenantId: String(dto.tenant_id),
      name: dto.name,
      displayOrder: dto.display_order ?? 0,
      isActive: dto.is_active ?? true,
    });

    return await this.repo.save(rec);
  }

  async findAll(): Promise<MenuCategory[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<MenuCategory> {
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
    dto: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> {
    const rec = await this.findOne(id);

    Object.assign(rec, {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.display_order !== undefined
        ? { displayOrder: dto.display_order }
        : {}),
      ...(dto.is_active !== undefined ? { isActive: dto.is_active } : {}),
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
