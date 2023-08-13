import { Router } from 'express';
import { emailAlreadyExist, infosAlreadyExists, verifyIdParams, verifyOS } from '../middlewares';
import developerController from '../controllers/developer.controller';


const developerRouter: Router = Router();

developerRouter.use("/:id", verifyIdParams);

developerRouter.post("", emailAlreadyExist, developerController.createDeveloper);

developerRouter.get("/:id", developerController.retriveDeveloper);

developerRouter.patch("/:id", emailAlreadyExist, developerController.updateDeveloper);

developerRouter.delete("/:id", developerController.destroyDeveloper);

developerRouter.post("/:id/infos", verifyOS, infosAlreadyExists, developerController.createDeveloperInfos);

export default developerRouter;