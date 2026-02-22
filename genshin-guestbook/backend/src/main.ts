import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

// For Vercel serverless - NO PORT LISTENING!
let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
      origin: '*',
      credentials: true,
    });
    
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    
    app.use(helmet());
    app.setGlobalPrefix('api');
    
    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

// This is the serverless handler Vercel needs
export default async function handler(req, res) {
  try {
    const app = await bootstrap();
    const server = app.getHttpAdapter().getInstance();
    return server(req, res);
  } catch (error) {
    console.error('Serverless error:', error);
    res.status(500).json({ error: error.message });
  }
}

// Only listen when running locally
if (!process.env.VERCEL) {
  async function localBootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(3000);
    console.log('Local server running on http://localhost:3000');
  }
  localBootstrap();
}