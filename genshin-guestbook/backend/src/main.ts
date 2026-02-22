import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';

@Controller('api')
class TestController {
  @Get('guestbook')
  getGuestbook() {
    return { message: 'API is working!', timestamp: new Date().toISOString() };
  }

  @Get('guestbook/stats')
  getStats() {
    return { entries: 0, likes: 0, message: 'Stats endpoint working' };
  }
}

@Module({
  imports: [],
  controllers: [TestController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  console.log('Test server running');
}

if (process.env.VERCEL) {
  module.exports = bootstrap;
} else {
  bootstrap();
}