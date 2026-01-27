import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JsonLogger } from './common/logger.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new JsonLogger(),
  });

  // グローバル例外フィルタの設定
  app.useGlobalFilters(new HttpExceptionFilter());

  // バリデーションパイプの設定
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTOに定義されていないプロパティを自動的に削除
      forbidNonWhitelisted: true, // 許可されていないプロパティが送信された場合にエラーを返す
      transform: true, // リクエストデータをDTOのインスタンスに自動変換
      transformOptions: {
        enableImplicitConversion: true, // 型変換を自動的に実行
      },
    }),
  );

  // OpenAPI (Swagger) セットアップ
  const config = new DocumentBuilder()
    .setTitle('RSS記事取得システム API')
    .setDescription('RSSフィードから技術記事を取得・管理するAPI')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS設定
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
