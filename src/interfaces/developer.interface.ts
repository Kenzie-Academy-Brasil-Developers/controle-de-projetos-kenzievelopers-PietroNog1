import { QueryResult } from "pg";

interface IDeveloperInfos{
    id: number;
    developersSince: Date;
    preferredOS: "Windows" | "Linux" | "MacOS";
    developerId: number;
}

type IDevelopersInfosCreate = Omit<IDeveloperInfos,"id">
type IDevelopersInfosResult = QueryResult<IDeveloperInfos>

interface IDeveloper{
    id: number;
    name: string;
    email: string;
}

type IDevelopersCreate = Omit<IDeveloper,"id" | "developerId">
type IDevelopersUpdadte = Partial<IDeveloper>
type IDevelopersRead = Array<IDeveloper>
type IDevelopersResult = QueryResult<IDeveloper>

interface IDevelopersRetriveResult{
    developerId: number;
    developerName: string;
    developerEmail: string;
    developerInfoDeveloperSince: Date | null;
    developerInfoPreferredOS: "Windows" | "Linux" | "MacOS" | null;
}


export { IDevelopersRetriveResult, IDeveloper, IDevelopersCreate, IDevelopersUpdadte, IDevelopersRead, IDeveloperInfos, IDevelopersInfosCreate, IDevelopersInfosResult, IDevelopersResult}