import { IDevelopersResult } from "../interfaces/developer.interface";
import format from "pg-format";
import { IProject, IProjectResult, IProjectUpdate, IProjectCreate, IProjectRetriveReturn } from "../interfaces/project.interface";
import { client } from "../database/database";

const projectRetrive = async (projectId: string):Promise<IProjectRetriveReturn> =>{

    const query: IProjectResult =  await client.query(
        'SELECT * FROM "projects" WHERE "id" = $1;', [projectId]
    )

    const projectInfo = query.rows[0];
    
    const developerOwner: IDevelopersResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1;',[projectInfo.developerId]
    )

    const projectReturn: IProjectRetriveReturn = {
       projectId: projectInfo.id,
       projectName: projectInfo.name,
       projectDescription: projectInfo.description,
       projectRepository: projectInfo.repository,
       projectStartDate: projectInfo.startDate,
       projectEndDate: projectInfo.endDate,
       projectDeveloperName: developerOwner.rows[0].name

    }

    return projectReturn

}

const projectCreate = async (payload:IProjectCreate):Promise<IProject> => {
    const queryFomart: string = format(
        'INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query: IProjectResult = await client.query(queryFomart)

    return query.rows[0]
}

const projectUpdate = async (payload:IProjectUpdate, projectId:string):Promise<IProject> => {
    const queryFomart: string = format(
        'UPDATE "projects" SET(%I) = ROW(%L) WHERE "id" = $1 RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query: IProjectResult = await client.query(queryFomart, [projectId])

    return query.rows[0]
}

export default{ projectCreate, projectRetrive, projectUpdate}