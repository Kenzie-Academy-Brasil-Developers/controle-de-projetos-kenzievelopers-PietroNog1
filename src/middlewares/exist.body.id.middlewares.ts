import { IProjectResult } from "../interfaces/project.interface";
import { client } from "../database/database";
import { AppError } from "../errors";
import { Request, Response, NextFunction } from "express";

const existBodyId = async (req: Request, res: Response, next: NextFunction) => {
    
    const {developerId} = req.body;

    const query: IProjectResult = await client.query(
        'SELECT * FROM developers WHERE id = $1', [developerId]
    );

    if (!query.rowCount) {
        throw new AppError('Developer not found', 404);
    }

    return next()
}

export default existBodyId;