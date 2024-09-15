import express from 'express';
import dotenv from 'dotenv';
import connetDB from './db/index.js';
import cors from 'cors';

dotenv.config(); //alowing env file across application

const app = express(); //app object

//middlewares
app.use(express.json()); //allowing json to read
app.use(
    express.urlencoded({
        extended: true,
        limit: '16kb',
    })
);
app.use(cors({
    origin: '*',
    credentials : true // This option indicates whether or not the response to the frontend can include cookies 
}))


//application sample
app.get('/', function (req, res, next) {
    res.send('Welcome');
});

//application routes
import userRouter from './user/user.router.js';
app.use('/api/v1', userRouter);

const PORT = process.env.PORT ?? 5500; //port

connetDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port:: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Connection failed: ' + error);
    });

/*
app.listen(PORT, () => { // sample for app to run on a particular port
    console.log(`Server is running at port:: http://localhost:${PORT}`);
});

*/
