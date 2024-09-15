import mongoose from 'mongoose';

const connetDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_DB}/jooland`
        );
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGODB CONNECTION FAILED', error);
        process.exit(1);
    }
};

export default connetDB;
