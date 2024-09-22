import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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

app.use(cookieParser());

//application sample
app.get('/', function (req, res, next) {
    res.send('Welcome');
});

//application routes
import userRouter from './user/user.router.js';
// import categoryRouter from './category/category.route.js';
// import brandRouter from './brand/brand.route.js';
import productRouter from './product/product.route.js';

app.use('/api/v1', userRouter);
// app.use('/api/v1', categoryRouter);
// app.use('/api/v1', brandRouter);
app.use('/api/v1', productRouter);

export default app;
