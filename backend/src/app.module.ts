import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { HealthModule } from './health/health.module';
import { SourcesModule } from './sources/sources.module';
import { ArticlesModule } from './articles/articles.module';
import { OutboxModule } from './outbox/outbox.module';
import { CronModule } from './cron/cron.module';
import { JobsModule } from './jobs/jobs.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'], // プロジェクトルートの.envを読み込む
      load: [configuration],
    }),
    HealthModule,
    SourcesModule,
    ArticlesModule,
    OutboxModule,
    CronModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
