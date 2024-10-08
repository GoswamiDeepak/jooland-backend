import dotenv from 'dotenv';
import connetDB from './db/index.js';
import app from './app.js';
import errorHanlderMiddleware from './middlewares/errorHandler-middleware.js';
dotenv.config(); //alowing .env file across application

app.use(errorHanlderMiddleware); //middleare to handle Error

const PORT = process.env.PORT ?? 5500; //port

//connection DB and after that running app on port
connetDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port:: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Connection failed: ' + error);
    });
