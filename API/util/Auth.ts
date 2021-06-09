require('dotenv').config({ path: `~/.env.${process.env.NODE_ENV}` })

import jwt from 'jsonwebtoken';
import User from '../models/User';

export function createTokens(user) {
    const createdAccessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN, { expiresIn: "3m" });
    const createdRefreshToken = jwt.sign({ user: user }, process.env.REFRESH_TOKEN, { expiresIn: "40d" });

    return [createdAccessToken, createdRefreshToken];
}

export const refreshTokens = async (refreshToken) => {
    let user;
    try {
        user = jwt.decode(refreshToken);
    } catch (err) {
        return { error: true, message: err };
    }

    const updatedUser = await User.findById(user.user._id);

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    } catch (err) {
        return { error: true, message: err };
    }

    const [newToken, newRefreshToken] = createTokens(updatedUser);
    return { accesstoken: newToken, refreshToken: newRefreshToken, error: false, user: updatedUser };
}