import express from 'express';
import dotenv from 'dotenv';
import connetDB from './db/index.js';

dotenv.config(); //alowing env file across application

const app = express(); //app object

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
