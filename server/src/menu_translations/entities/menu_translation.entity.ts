import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';

@Entity({ name: 'menu_translations' })
@Unique('uq_menu_translations_menu_lang', ['menuId', 'languageCode'])
@Index('idx_menu_translations_menu_lang', ['menuId', 'languageCode'])
export class MenuTranslation {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'menu_id', type: 'bigint' })
  menuId: string;

  @ManyToOne(() => Menu, (menu) => menu.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @Column({ name: 'language_code', length: 10 })
  languageCode: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
 
