import { NextFunction, Response } from "express";

export const statusValidate = (req, res: Response, next: NextFunction) => {
    if (!req.body.status) {
        return next();
    }

    req.body.status.toUpperCase();
    const status = req.body.status;

    if (status === "PENDING" || status === "HANDLING" || status === "HANDLED") {
        return next();
    }

    return res.status(400).json({ message: 'Status that is incorrect must be: "PENDING", "HANDLING" or "HANDLED otherwise not accepted' });
}