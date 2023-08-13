import { IDeveloper, IDevelopersInfosCreate, IDevelopersRetriveResult } from "../interfaces/developer.interface";
import { Request, Response } from "express";
import developerServices from '../services/developer.service';

const createDeveloper = async (req: Request, res: Response):Promise<Response> => {
    const developer: IDeveloper = await developerServices.create(req.body)
    return res.status(201).json(developer);
}

const retriveDeveloper = async (req: Request, res: Response):Promise<Response> => {
    const developer: IDevelopersRetriveResult = await developerServices.retrive(req.params.id)
    return res.status(200).json(developer);
}

const updateDeveloper = async (req: Request, res: Response):Promise<Response> => {
    const developer: IDeveloper = await developerServices.update(req.body, req.params.id)
    return res.status(200).json(developer);
}

const destroyDeveloper = async (req: Request, res: Response):Promise<Response> => {
    await developerServices.destroy(req.params.id)
    return res.status(204).json();
}

const createDeveloperInfos = async (req: Request, res: Response):Promise<Response> => {
    const payload: IDevelopersInfosCreate = { ...req.body, developerId: req.params.id }
    const developerInfos = await developerServices.creatInfos(payload)
    return res.status(201).json(developerInfos);
}

export default{ createDeveloper, retriveDeveloper, updateDeveloper, destroyDeveloper, createDeveloperInfos }