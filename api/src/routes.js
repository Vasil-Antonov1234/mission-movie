import { Router } from "express";
import movieController from "./controllers/movieController.js";
import reviewController from "./controllers/reviewController.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.use("/movies", movieController);
routes.use("/reviews", reviewController);
routes.use("/users", userController);

export default routes;