import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserRoleDto {
	@IsNotEmpty()
	user_id: string;

	@IsNotEmpty()
	@IsString()
	role_name: string;

	@IsOptional()
	permissions?: any;
}
 
