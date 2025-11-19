import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ example: 'Sense Restaurant' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'sense' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  subdomain?: string;

  @ApiPropertyOptional({ example: 'ja' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  defaultLanguage?: string;

  @ApiPropertyOptional({ example: 'THB' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @ApiPropertyOptional({ example: 'Asia/Bangkok' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  timezone?: string;

  @ApiPropertyOptional({ example: 'premium' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  subscriptionPlan?: string;

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  subscriptionStatus?: string;

  @ApiPropertyOptional({ example: 3000, description: 'Monthly fee in the tenant currency' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  monthlyFee?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxTables?: number;

  @ApiPropertyOptional({ example: '123 Main St, Bangkok' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '+66 1234 5678' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: 'contact@sense.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
