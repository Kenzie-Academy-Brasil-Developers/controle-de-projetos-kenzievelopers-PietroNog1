import { IProject, IProjectRetriveReturn } from "../interfaces/project.interface";
import { Request, Response } from "express";
import  ProjectService  from "../services/project.services";

const createProject = async (req: Request, res: Response):Promise<Response> => {
    const project:IProject = await ProjectService.projectCreate(req.body);
    return res.status(201).json(project);
}

const readProject = async (req: Request, res: Response):Promise<Response> => {
    const project: IProjectRetriveReturn = await ProjectService.projectRetrive(req.params.id);
    return res.status(200).json(project);
}

const updateProject = async (req: Request, res: Response):Promise<Response> => {
    const project: IProject = await ProjectService.projectUpdate(req.body, req.params.id);
    return res.status(200).json(project);
}

export default{ createProject, readProject, updateProject}