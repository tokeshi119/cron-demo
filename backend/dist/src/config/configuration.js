"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
        url: process.env.DATABASE_URL,
    },
    frontend: {
        url: process.env.FRONTEND_URL || 'http://localhost:3001',
    },
});
//# sourceMappingURL=configuration.js.map