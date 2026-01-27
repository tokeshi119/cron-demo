import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JsonLogger } from './common/logger.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { execSync } from 'child_process';

async function bootstrap() {
  // 本番環境でマイグレーションを自動実行
  if (process.env.NODE_ENV === 'production') {
    try {
      console.log('🔄 Prismaマイグレーションを実行中...');
      execSync('npx prisma migrate deploy', {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
      console.log('✅ マイグレーションが完了しました');
    } catch (error) {
      console.error('❌ マイグレーションエラー:', error);
      // エラーが発生してもアプリケーションは起動を続ける
    }
  }

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
    origin: process.env.FRONTEND_URL || 'http://localhost:3003',
    credentials: true,
  });

  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  console.log(`🚀 バックエンドサーバーが起動しました: http://localhost:${port}`);
  console.log(`📚 Swagger UI: http://localhost:${port}/api`);
}
bootstrap();
