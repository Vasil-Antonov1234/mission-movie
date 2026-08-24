import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { createCastSchema } from "../schemas/castSchema.js";
import castService from "../services/castService.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import querystring from "node:querystring";

const castController = Router();

castController.post("/create", isAuthMiddleware, async (req, res) => {

    try {
        const castData = await createCastSchema.parse(req.body);

        const cast = await castService.createOne(castData);

        res.status(201).json(cast);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };

});

castController.get("/", async (req, res) => {
    let filter = {};

    if (req.query.where) {
        if (Array.isArray(req.query.where)) {
            req.query.where.forEach((x) => filter[x.replaceAll('"', '').split("=")[0]] = x.replaceAll('"', '').split("=")[1]);
        } else {
            filter = querystring.parse(req.query.where.replaceAll('"', ''));
        };
    };

    const movieId = Number(filter.movieId)

    try {
        const cast = await castService.getAll(movieId);

        res.status(200).json(cast);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

castController.post("/attach", isAuthMiddleware, async (req, res) => {
    const castData = req.body;

    try {
        const result = await castService.attach(castData);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };

})

export default castController;