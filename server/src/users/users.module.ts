import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TenantsModule } from '../tenants/tenants.module'; // only if you inject TenantsService in UsersService

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // only if you need TenantsService inside UsersService:
    // forwardRef(() => TenantsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // <– IMPORTANT
})
export class UsersModule {}
