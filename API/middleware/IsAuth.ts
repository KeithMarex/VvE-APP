import jwt from "jsonwebtoken";
import 'dotenv/config'
import { refreshTokens } from "../util/Auth";

export const isAuth = async (req, res, next) => {
    if (!req.cookies['access-token']) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(req.cookies['access-token'], process.env.ACCESS_TOKEN, async(err, authorizedData) => {
        if(err) {
            const newTokens = await refreshTokens(req.cookies['refresh-token']);
            if (!newTokens.error) {
                res.cookie('access-token', newTokens.accesstoken, { maxAge: 3 * 60 * 60 * 1000 , httpOnly: true, secure: false });
                res.cookie('refresh-token', newTokens.refreshToken, { maxAge: 60 * 60 * 24 * 40 * 1000 , httpOnly: true, secure: false });
                req.locals.user = newTokens.user;
                return next();
            } else {
                return res.status(401).json({ message: newTokens.message });
            }
        } else {
            console.log("This is the authorizedData: ", authorizedData)
            req.locals.user = authorizedData.user;
            next();
        }
    });
}
