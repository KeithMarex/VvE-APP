const User = require('../models/User');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
require('dotenv').config()

module.exports.createTokens = async (user, secret, secret2) => {
    user = JSON.parse(JSON.stringify(user));
    const createToken = jwt.sign(
        {
            user: _.pick(user, ['id']),
        },
        secret,
        {
            expiresIn: '1m',
        },
    );
    const createRefreshToken = jwt.sign(
        {
            user: _.pick(user, 'id'),
        },
        secret2,
        {
            expiresIn: '14d',
        },
    );

    return Promise.all([createToken, createRefreshToken]);
}

module.exports.refreshTokens = async (token, refreshToken, SECRET, SECRET_2) => {
    let userId = -1;
    try {
        const { user: { id } } = jwt.decode(refreshToken);
        userId = id;
    } catch (err) {
        return {};
    }

    if (!userId) {
        return {};
    }

    const user = await User.findById(userId);
    if (!user) {
        return {};
    }

    const refreshSecret = SECRET_2 + user.password;
    try {
        jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
        return {};
    }

    const [newToken, newRefreshToken] = await this.createTokens(user, SECRET, refreshSecret);
    return {
        token: newToken,
        refreshToken: newRefreshToken,
        user,
    };
}

