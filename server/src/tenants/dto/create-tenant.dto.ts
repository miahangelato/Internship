import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsIn,
} from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  subdomain?: string;

  @IsString()
  @IsIn(['ja', 'en', 'th'])
  defaultLanguage: string = 'ja';

  @IsString()
  @Length(3, 10)
  currency: string = 'THB';

  @IsString()
  @Length(3, 50)
  timezone: string = 'Asia/Bangkok';

  @IsString()
  @IsIn(['basic', 'pro', 'enterprise'])
  subscriptionPlan: string = 'basic';

  @IsString()
  @IsIn(['active', 'inactive', 'trial', 'expired'])
  subscriptionStatus: string = 'active';

  @IsNumber()
  monthlyFee: number = 3000;

  @IsInt()
  @Min(1)
  @Max(500)
  maxTables: number = 30;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
