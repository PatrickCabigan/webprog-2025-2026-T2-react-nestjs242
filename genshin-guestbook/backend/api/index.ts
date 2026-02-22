import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import express from 'express';

// CORS configuration must be here
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};

async function bootstrap() {
  // Create Express instance
  const server = express();

  // Create Nest app with CORS in create options (fixes preflight issues) [citation:6]
  const app = await NestFactory.create(
    AppModule,
    new (require('@nestjs/platform-express').ExpressAdapter)(server),
    { cors: corsOptions } // Critical: CORS here, not with app.enableCors()
  );

  // Apply all the same configs as your main.ts
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.use(helmet());
  app.setGlobalPrefix('api');
  
  await app.init();
  
  return server;
}

// Export for Vercel
export default async function handler(req: any, res: any) {
  try {
    const server = await bootstrap();
    return server(req, res);
  } catch (error) {
    console.error('Serverless error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message 
    });
  }
}