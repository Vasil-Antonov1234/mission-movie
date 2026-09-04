import { Router } from "express";
import movieController from "./controllers/movieController.js";
import reviewController from "./controllers/reviewController.js";
import userController from "./controllers/userController.js";
import castController from "./controllers/castController.js";
import commentController from "./controllers/commentController.js";
import rateController from "./controllers/rateController.js";

const routes = Router();

routes.use("/movies", movieController);
routes.use("/reviews", reviewController);
routes.use("/users", userController);
routes.use("/casts", castController);
routes.use("/comments", commentController);
routes.use("/rates", rateController);

export default routes;