import CustomErrorHandler from './custom-errorHandler.js';

export default async function generateAccessAndRefreshToken(user) {
    try {
        // const user = await User.findById(user._id);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {
        throw CustomErrorHandler.serverError(
            'Something went wrong while generating referesh and access token'
        );
    }
}
