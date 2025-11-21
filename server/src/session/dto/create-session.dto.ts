import { IsNotEmpty, IsOptional, IsNumberString, IsInt, IsBoolean, IsISO8601 } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsNumberString()
  tenant_id: string;

  @IsNotEmpty()
  @IsNumberString()
  table_id: string;

  @IsOptional()
  @IsInt()
  guest_count?: number = 1;

  @IsOptional()
  @IsISO8601()
  started_at?: string;

  @IsOptional()
  @IsISO8601()
  expires_at?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean = true;

  @IsOptional()
  @IsISO8601()
  closed_at?: string;
}
