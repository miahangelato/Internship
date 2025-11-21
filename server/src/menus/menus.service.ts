import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly repo: Repository<Menu>,
  ) {}

  async create(dto: CreateMenuDto): Promise<Menu> {
    if (!dto.tenant_id || !dto.name) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation error',
        details: { received: dto },
      });
    }

    if (dto.sku) {
      const existing = await this.repo.findOne({
        where: { sku: dto.sku },
      });

      if (existing) {
        throw new ConflictException({
          code: 'DUPLICATE_RESOURCE',
          message: 'Duplicate resource',
          details: { sku: dto.sku },
        });
      }
    }

    const rec: Menu = this.repo.create({
      tenantId: String(dto.tenant_id),
      categoryId: dto.category_id ? String(dto.category_id) : undefined,
      sku: dto.sku,
      name: dto.name,
      description: dto.description,
      price: dto.price ?? '0.00',
      imageUrl: dto.image_url,
      allergenInfo: dto.allergen_info,
      preparationArea: dto.preparation_area ?? 'kitchen',
      preparationTimeMinutes: dto.preparation_time_minutes ?? 15,
      isAvailable: dto.is_available ?? true,
      stockQuantity: dto.stock_quantity,
      displayOrder: dto.display_order ?? 0,
      isActive: dto.is_active ?? true,
    });

    return await this.repo.save(rec);
  }

  async findAll(): Promise<Menu[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<Menu> {
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

  async update(id: number | string, dto: UpdateMenuDto): Promise<Menu> {
    const rec = await this.findOne(id);

    if (dto.sku) {
      const existing = await this.repo.findOne({
        where: { sku: dto.sku },
      });

      if (existing && existing.id !== rec.id) {
        throw new ConflictException({
          code: 'DUPLICATE_RESOURCE',
          message: 'Duplicate resource',
          details: { sku: dto.sku },
        });
      }
    }

    Object.assign(rec, {
      ...(dto.category_id !== undefined
        ? { categoryId: dto.category_id ? String(dto.category_id) : undefined }
        : {}),
      ...(dto.sku !== undefined ? { sku: dto.sku } : {}),
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      ...(dto.price !== undefined ? { price: dto.price } : {}),
      ...(dto.image_url !== undefined ? { imageUrl: dto.image_url } : {}),
      ...(dto.allergen_info !== undefined
        ? { allergenInfo: dto.allergen_info }
        : {}),
      ...(dto.preparation_area !== undefined
        ? { preparationArea: dto.preparation_area }
        : {}),
      ...(dto.preparation_time_minutes !== undefined
        ? { preparationTimeMinutes: dto.preparation_time_minutes }
        : {}),
      ...(dto.is_available !== undefined
        ? { isAvailable: dto.is_available }
        : {}),
      ...(dto.stock_quantity !== undefined
        ? { stockQuantity: dto.stock_quantity }
        : {}),
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
