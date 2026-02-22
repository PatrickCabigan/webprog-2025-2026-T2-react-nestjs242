import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
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
  
  // For serverless, don't listen on a port
  if (process.env.VERCEL) {
    return app;
  }
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

// Export for Vercel serverless
export default async function handler(req, res) {
  const app = await bootstrap();
  await app.init();
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
}