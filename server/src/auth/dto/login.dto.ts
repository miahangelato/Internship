import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'staff@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8, example: 'StrongPassword123!' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
