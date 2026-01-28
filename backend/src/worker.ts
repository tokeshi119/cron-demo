import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OutboxWorker } from './outbox/outbox.worker';
import { JsonLogger } from './common/logger.service';
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
      // エラーが発生してもワーカーは起動を続ける
    }
  }

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: new JsonLogger(),
  });

  const worker = app.get(OutboxWorker);
  await worker.onModuleInit();

  // シグナルハンドリング
  const shutdown = async () => {
    console.log('シグナルを受信しました。ワーカーを停止します...');
    await worker.onModuleDestroy();
    await app.close();
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  console.log('🚀 Outboxワーカーが起動しました');
}

bootstrap().catch((error) => {
  console.error('ワーカーの起動に失敗しました:', error);
  process.exit(1);
});
