import { IDevelopersInfosResult } from "../interfaces/developer.interface";
import { client } from "../database/database";
import { AppError } from "../errors";
import { Request, Response, NextFunction } from "express";

const infosAlreadyExists = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const developerId = req.params.id;
    if (!developerId) {
        return next();
    }

    const query: IDevelopersInfosResult = await client.query(
        'SELECT * FROM "developerInfos" WHERE "developerId" = $1', [developerId]
    )

    if (query.rowCount) {
        throw new AppError('Developer infos already exists.', 409);
    }

    return next();
}

export default infosAlreadyExists;

