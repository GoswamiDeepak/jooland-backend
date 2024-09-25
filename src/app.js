import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import logger from './utils/logger.js';

const app = express(); //app object

//middlewares
app.use(express.json()); //allowing json to read

app.use(
    express.urlencoded({
        extended: true,
        limit: '16kb',
    })
);

app.use(
    cors({
        origin: '*',
        credentials: true, // This option indicates whether or not the response to the frontend can include cookies
    })
);

app.use(cookieParser()); //allowing cookie in middleware 

const morganFormat = ':method :url :status :response-time ms';
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(' ')[0],
                    url: message.split(' ')[1],
                    status: message.split(' ')[2],
                    responseTime: message.split(' ')[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

//application sample
app.get('/', function (req, res, next) {
    res.send('Welcome');
});

//application routes
import userRouter from './user/user.router.js';
import categoryRouter from './category/category.route.js';
import brandRouter from './brand/brand.route.js';
import productRouter from './product/product.route.js';
import cartRouter from './cart/cart.route.js';
import orderRouter from './order/order.route.js';

app.use('/api/v1', userRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', brandRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', cartRouter);
app.use('/api/v1', orderRouter);

export default app;
