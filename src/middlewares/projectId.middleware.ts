import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";
import { IProjectResult } from "../interfaces/project.interface";
import { client } from "../database/database";

const projectVerifyId = async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params;

    const query: IProjectResult = await client.query(
        'SELECT * FROM projects WHERE id = $1', [id]
    )

    if(!query.rowCount) {
        throw new AppError('Project not found', 404);
    }

    return next();
}

export default projectVerifyId;
