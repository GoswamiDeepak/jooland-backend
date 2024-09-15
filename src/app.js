import express from 'express';
import cors from 'cors';


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

//application sample
app.get('/', function (req, res, next) {
    res.send('Welcome');
});

//application routes
import userRouter from './user/user.router.js';
app.use('/api/v1', userRouter);

export default app;


