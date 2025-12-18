import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middlewares/error.handler';
import { successResponse } from './utils/response';
import productRouter from './routes/product.route';
import userRouter from './routes/user.route';
import categoryRouter from './routes/category.route';
import orderRouter from './routes/order.routes';
import orderItemRouter from './routes/order_items.routes';
import authRouter from './routes/auth.route';
import profileRouter from './routes/profile.route';
import { requestLogger } from './middlewares/logging.middleware';
import { authenticate } from './middlewares/auth.middlewares';
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(requestLogger);
app.use((req, _res, next) => {
    req.startTime = Date.now();
    next();
});
app.get("/", (req, res) => {
    const time = Date.now() - req.startTime;
    successResponse(res, "API Produk aktif!", { waktuProses: `${time}ms` });
});
// ROUTE TEST ERROR
app.get("/api/error-test", () => {
    throw new Error("Ini error test!");
});
app.use('/api/profile', profileRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', authenticate, orderRouter);
app.use('/api/order-items', orderItemRouter);
app.use('/api/auth', authRouter);
// 404 fallback
app.use((req) => {
    throw new Error(`Route ${req.originalUrl} tidak ditemukan!`);
});
// GLOBAL ERROR HANDLER
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map