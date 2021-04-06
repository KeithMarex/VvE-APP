const jwt = require('jsonwebtoken');
const User = require('./models/user.js');
require('dotenv/config');

module.exports.createTokens = (user) => {
    const createdAccessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN, { expiresIn: "3m" });
    const createdRefreshToken = jwt.sign({ user: user }, process.env.REFRESH_TOKEN, { expiresIn: "40d" });

    return [createdAccessToken, createdRefreshToken];
}

module.exports.refreshTokens = async (refreshToken) => {
    let user;
    try {
        user = jwt.decode(refreshToken);
    } catch (err) {
        return { error: true, message: err };
    }

    const updatedUser = await User.findById(user.id);

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    } catch (err) {
        return { error: true, message: err };
    }

    const [newToken, newRefreshToken] = this.createTokens(updatedUser);
    return { accesstoken: newToken, refreshToken: newRefreshToken, error: false, user: updatedUser };
}