import { NextFunction, Request, Response } from "express";

export default class AppError extends Error {

    constructor(public message: string, public statusCode:number = 400){
        super(message)
    }
}

export const handlerError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        })
    }
    console.error(err);

    return res.status(500).json({menssage: "Internal server error"});
};