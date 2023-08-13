import { NextFunction,Request, Response } from "express";
import { AppError } from "../errors";

const verifyOS = (req: Request, res: Response, next: NextFunction) => {
    const {preferredOS} = req.body;

    if(preferredOS !== 'Windows' &&  preferredOS !== 'Linux' && preferredOS !== 'MacOS') {
        throw new AppError('Invalid OS option.', 400);
    }

    return next();
}

export default verifyOS;