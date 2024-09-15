import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
        },
        role: {
            type: String,
            enum: ['admin', 'user', 'manager'],
            default: 'user',
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamp: true }
);

export const User = mongoose.model('User', userSchema);
