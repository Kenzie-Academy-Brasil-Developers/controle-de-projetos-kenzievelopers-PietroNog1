import { IDeveloper,IDevelopersCreate, IDevelopersResult, IDevelopersRetriveResult, IDeveloperInfos, IDevelopersInfosResult, IDevelopersUpdadte, IDevelopersInfosCreate } from "../interfaces/developer.interface";
import format from "pg-format";
import { client } from "../database/database";

const create = async(payload:IDevelopersCreate):Promise<IDeveloper> => {
    const queryFormat:string = format(
        'INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )
    
    const query: IDevelopersResult = await client.query(queryFormat)
    return query.rows[0]
}

const retrive = async(developerId:string):Promise<IDevelopersRetriveResult> =>{
    const query: IDevelopersResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1',[developerId]
    )

    const queryInfos: IDevelopersInfosResult= await client.query(
        'SELECT * FROM "developerInfos" WHERE "developerId" = $1',[developerId]
    )

    const developer = {...query.rows[0]}
    const infos = {...queryInfos.rows[0]}

    const finalObj:IDevelopersRetriveResult = {
        developerId: developer.id,
        developerName: developer.name,
        developerEmail: developer.email,
        developerInfoDeveloperSince: infos.developersSince || null,
        developerInfoPreferrdOS: infos.preferredOS || null
    }

    return finalObj 
}

const destroy = async (developerId:string):Promise<void> => {
    await client.query('DELETE FROM "developers" WHERE "id" = $1',[developerId])
}

const update = async (payload:IDevelopersUpdadte, developerId:string):Promise<IDeveloper> =>{
    const queryFormat:string = format(
        'UPDATE "developers" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query: IDevelopersResult = await client.query(queryFormat, [developerId])

    return query.rows[0]
}

const creatInfos = async (payload:IDevelopersInfosCreate):Promise<IDeveloperInfos> =>{
    const queryFormat:string = format(
        'INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query: IDevelopersInfosResult = await client.query(queryFormat)

    return query.rows[0]
}

export default { create, retrive, destroy, update, creatInfos}