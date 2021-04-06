const jwt = require("jsonwebtoken");
const auth = require("../auth.ts");

module.exports = async (req, res, next) => {
    if (!req.cookies['access-token']) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(req.cookies['access-token'], process.env.ACCESS_TOKEN_SECRET, async(err, authorizedData) => {
        if(err) {
            const newTokens = await auth.refreshTokens(req.cookies['refresh-token']);
            if (!newTokens.error) {
                res.cookie('access-token', newTokens.accesstoken, { maxAge: 3 * 60 * 60 * 1000 , httpOnly: true, secure: true });
                res.cookie('refresh-token', newTokens.refreshToken, { maxAge: 60 * 60 * 24 * 40 * 1000 , httpOnly: true, secure: true });
                req.locals.user = newTokens.user;
                next();
            } else {
                return res.status(401).json({ message: newTokens.message });
            }
        } else {
            req.locals.user = authorizedData.user;
            next();
        }
    });
}
