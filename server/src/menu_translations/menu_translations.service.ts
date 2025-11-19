import { Injectable, NotFoundException } from '@nestjs/common';
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
    const rec = this.repo.create({
      menuId: String(dto.menu_id),
      languageCode: dto.language_code,
      name: dto.name,
      description: dto.description,
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as MenuTranslation;
  }

  async findAll(): Promise<MenuTranslation[]> {
    return this.repo.find();
  }

  async findOne(id: number | string): Promise<MenuTranslation> {
    const r = await this.repo.findOne({ where: { id: String(id) } as any });
    if (!r) throw new NotFoundException(`MenuTranslation ${id} not found`);
    return r;
  }

  async update(id: number | string, dto: UpdateMenuTranslationDto): Promise<MenuTranslation> {
    const rec = await this.findOne(id);
    Object.assign(rec, {
      ...(dto.language_code !== undefined ? { languageCode: dto.language_code } : {}),
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
    } as any);
    const saved = await this.repo.save(rec);
    return saved as unknown as MenuTranslation;
  }

  async remove(id: number | string): Promise<void> {
    const res = await this.repo.delete(String(id));
    if (res.affected === 0) throw new NotFoundException(`MenuTranslation ${id} not found`);
  }
}
