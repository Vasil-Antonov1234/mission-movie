import { Router } from "express";
import movieController from "./controllers/movieController.js";

const routes = Router();

routes.use("/movies", movieController);

export default routes;