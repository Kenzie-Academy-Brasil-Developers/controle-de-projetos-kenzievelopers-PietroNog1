import { Router } from "express";
import { projectControllers } from "../controllers";
import { existBodyId, projectVerifyId } from "../middlewares";

const projectRouter: Router = Router();

projectRouter.use("/:id", projectVerifyId );

projectRouter.post("", existBodyId, projectControllers.createProject);

projectRouter.get("/:id", projectControllers.readProject);

projectRouter.patch("/:id", existBodyId, projectControllers.updateProject);

export default projectRouter;