import { Injectable, NotFoundException } from '@nestjs/common';
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
    const rec = this.repo.create({
      tenantId: String(dto.tenant_id),
      name: dto.name,
      displayOrder: dto.display_order ?? 0,
      isActive: dto.is_active ?? true,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as MenuCategory;
  }

  async findAll(): Promise<MenuCategory[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<MenuCategory> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`MenuCategory ${id} not found`);
    return r;
  }

  async update(id: number | string, dto: UpdateMenuCategoryDto): Promise<MenuCategory> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.display_order !== undefined ? { displayOrder: dto.display_order } : {}),
      ...(dto.is_active !== undefined ? { isActive: dto.is_active } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as MenuCategory;
  }

  async remove(id: number | string): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`MenuCategory ${id} not found`);
  }
}
