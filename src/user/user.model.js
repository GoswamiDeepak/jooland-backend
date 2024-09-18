import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

//hash password before saving using middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCheck = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        { _id: this._id, username: this.username, email: this.email }, //payload
        process.env.ACCESS_TOKEN_SECRET, //secret token
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        { _id: this._id, username: this.username, email: this.email }, //payload
        process.env.REFRESH_TOKEN_SECRET, //secret token
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model('User', userSchema);
