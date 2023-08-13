import { IDevelopersResult } from "../interfaces/developer.interface";
import { client } from "../database/database";
import { AppError } from "../errors";
import { Request, Response, NextFunction } from "express";

const developerInfosAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    const query: IDevelopersResult = await client.query(
        'SELECT * FROM developers WHERE id = $1', [id]
    )

    if(query.rowCount) {
        throw new AppError('Developer already exists', 409);
    }

    return next();
}

export default developerInfosAlreadyExists;