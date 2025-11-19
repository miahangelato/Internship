import { Injectable, NotFoundException } from '@nestjs/common';
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
    const rec = this.repo.create({
      tenantId: String(dto.tenant_id),
      categoryId: dto.category_id ? String(dto.category_id) : null,
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
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Menu;
  }

  async findAll(): Promise<Menu[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<Menu> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`Menu ${id} not found`);
    return r;
  }

  async update(id: number | string, dto: UpdateMenuDto): Promise<Menu> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.category_id !== undefined ? { categoryId: dto.category_id ? String(dto.category_id) : null } : {}),
      ...(dto.sku !== undefined ? { sku: dto.sku } : {}),
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      ...(dto.price !== undefined ? { price: dto.price } : {}),
      ...(dto.image_url !== undefined ? { imageUrl: dto.image_url } : {}),
      ...(dto.allergen_info !== undefined ? { allergenInfo: dto.allergen_info } : {}),
      ...(dto.preparation_area !== undefined ? { preparationArea: dto.preparation_area } : {}),
      ...(dto.preparation_time_minutes !== undefined ? { preparationTimeMinutes: dto.preparation_time_minutes } : {}),
      ...(dto.is_available !== undefined ? { isAvailable: dto.is_available } : {}),
      ...(dto.stock_quantity !== undefined ? { stockQuantity: dto.stock_quantity } : {}),
      ...(dto.display_order !== undefined ? { displayOrder: dto.display_order } : {}),
      ...(dto.is_active !== undefined ? { isActive: dto.is_active } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as Menu;
  }

  async remove(id: number | string): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`Menu ${id} not found`);
  }
}
