import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type UserRole = 'admin' | 'staff' | 'customer';

export class CreateUserDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumberString()
  tenant_id: string;

  @ApiProperty({ example: 'staff001' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'staff001@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'Staff Member' })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiPropertyOptional({ enum: ['admin', 'staff', 'customer'], default: 'staff' })
  @IsOptional()
  @IsIn(['admin', 'staff', 'customer'])
  role: UserRole = 'staff';

  @ApiPropertyOptional({ example: 'ja' })
  @IsOptional()
  @IsString()
  language_preference?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ minLength: 8, example: 'StrongPassword123!' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
