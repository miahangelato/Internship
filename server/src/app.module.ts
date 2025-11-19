
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MenusModule } from './menus/menus.module';
import { TablesModule } from './tables/tables.module';
import { SessionModule } from './session/session.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersItemsModule } from './order_items/orders_items.module';
import { PaymentsModule } from './payments/payments.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { CartsModule } from './carts/carts.module';
import { MenuTranslationsModule } from './menu_translations/menu_translations.module';
import { MenuCategoriesModule } from './menu_categories/menu_categories.module';
import { OrderStatusHistoryModule } from './order_status_history/order_status_history.module';
import { PaymentWebhooksModule } from './payment_webhooks/payment_webhooks.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}` }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
  
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<number>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
          synchronize: false,
          migrationsRun: true,
        };
      },
    }),
    TenantsModule,
    UsersModule,
    MenusModule,
    TablesModule,
    SessionModule,
    OrdersModule,
    OrdersItemsModule,
    PaymentsModule,
    UserRolesModule,
    MenuCategoriesModule,
    MenuTranslationsModule,
    CartsModule,
    CartItemsModule,
    OrderStatusHistoryModule,
    PaymentWebhooksModule,
    AuthModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
