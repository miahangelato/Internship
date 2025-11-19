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
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity({ name: 'users' })
@Index('idx_users_tenant', ['tenantId'])
@Unique('uq_users_tenant_email', ['tenantId', 'email'])
@Unique('uq_users_cognito_id', ['cognitoUserId'])
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'tenant_id', type: 'bigint' })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'cognito_user_id', type: 'varchar', nullable: true })
  cognitoUserId: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 255 })
  email: string;

  @Column({ name: 'full_name', length: 255, nullable: true })
  fullName?: string;

  @Column({ length: 50, default: 'staff' })
  role: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255, nullable: true, select: false })
  passwordHash?: string;

  @Column({
    name: 'refresh_token_hash',
    type: 'varchar',
    length: 500,
    nullable: true,
    select: false,
  })
  refreshTokenHash?: string | null;

  @Column({ name: 'language_preference', length: 10, default: 'ja' })
  languagePreference: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
