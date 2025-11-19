import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOrigins = configService.get<string>('CORS_ORIGIN');
  app.enableCors({
    origin: corsOrigins ? corsOrigins.split(',').map((origin) => origin.trim()) : true,
    credentials: true,
  });

  const sessionSecret = configService.get<string>('SESSION_SECRET') ?? 'change_me_session_secret';
  const sessionTtl = Number(configService.get<number>('SESSION_TTL') ?? 1000 * 60 * 60 * 24);

  app.use(cookieParser(sessionSecret));
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: (configService.get<string>('NODE_ENV') ?? 'development') === 'production',
        maxAge: sessionTtl,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Intern API')
    .setDescription('Interactive documentation for the restaurant management backend.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Paste the access token here to authorize.',
      },
      'access-token',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get<number>('APP_PORT') ?? process.env.PORT ?? 3000;
  await app.listen(port);
}
bootstrap();
