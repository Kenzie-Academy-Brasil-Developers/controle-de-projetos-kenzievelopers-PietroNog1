import { Request, Response, NextFunction } from 'express';
import { client } from '../database/database';
import { AppError } from '../errors';
import { IDevelopersResult } from '../interfaces/developer.interface';

const emailAlreadyExist = async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;

    if(!email) {
        return next();
    }

    const query: IDevelopersResult = await client.query(
        'SELECT * FROM developers WHERE email = $1', [email]
    )

    if(query.rowCount) throw new AppError('Email already exists', 409);

    return next();
}

export default emailAlreadyExist;

