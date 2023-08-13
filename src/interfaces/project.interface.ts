import { QueryResult } from "pg";

interface IProject{
    id: number;
    name: string;
    description: string;
    repository: string;
    startDate: Date;
    endDate: Date | null| undefined;
    developerId: number;
}

type IProjectCreate = Omit<IProject, "id" | "developerId">;
type IProjectUpdate = Partial<IProjectCreate>;
type IProjectResult = QueryResult<IProject>

interface IProjectRetriveReturn{
    projectId: number;
    projectName: string;
    projectDescription: string;
    projectRepository: string;
    projectStartDate: Date;
    projectEndDate: Date | null| undefined;
    projectDeveloperName: string;
}

export { IProjectRetriveReturn, IProject, IProjectCreate, IProjectUpdate, IProjectResult}