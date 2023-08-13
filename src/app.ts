import "express-async-errors"
import "dotenv/config";
import express, { Application, json } from "express";
import developerRouter  from "./routers/developer.router";
import { handlerError } from "./errors/app.erro";
import projectRouter from "./routers/project.router";

const app: Application = express();

app.use(json());

app.use("/developers", developerRouter)

app.use('/projects', projectRouter)

app.use(handlerError)

export default app;
