import { NextFunction, Response } from "express";

export const isAdmin = (req, res: Response, next: NextFunction) => {
    if (res.locals.user.role === "admin") {
        return next();
    }
    res.status(403).json({message: "You are not authorized for this request"});
}