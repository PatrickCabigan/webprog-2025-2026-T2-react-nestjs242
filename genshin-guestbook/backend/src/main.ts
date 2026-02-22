import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.use(helmet());
  app.setGlobalPrefix('api');
  
  return app;
}

// For Vercel serverless
let cachedApp;

export default async function handler(req, res) {
  try {
    if (!cachedApp) {
      const app = await bootstrap();
      await app.init();
      cachedApp = app;
    }
    
    const server = cachedApp.getHttpAdapter().getInstance();
    return server(req, res);
  } catch (error) {
    console.error('Serverless error:', error);
    res.status(500).json({ error: error.message });
  }
}