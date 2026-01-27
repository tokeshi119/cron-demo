"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const outbox_worker_1 = require("./outbox/outbox.worker");
const logger_service_1 = require("./common/logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, {
        logger: new logger_service_1.JsonLogger(),
    });
    const worker = app.get(outbox_worker_1.OutboxWorker);
    await worker.onModuleInit();
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
//# sourceMappingURL=worker.js.map