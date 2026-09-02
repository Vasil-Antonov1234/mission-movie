import { Router } from "express";
import movieController from "./controllers/movieController.js";
import reviewController from "./controllers/reviewController.js";
import userController from "./controllers/userController.js";
import castController from "./controllers/castController.js";
import commentController from "./controllers/commentController.js";
import ratingController from "./controllers/ratingController.js";

const routes = Router();

routes.use("/movies", movieController);
routes.use("/reviews", reviewController);
routes.use("/users", userController);
routes.use("/casts", castController);
routes.use("/comments", commentController);
routes.use("/rates", ratingController);

export default routes;