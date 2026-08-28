import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { createCastSchema } from "../schemas/castSchema.js";
import castService from "../services/castService.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import querystring from "node:querystring";
import { editCastSchema } from "../schemas/partialCastSchema.js";

const castController = Router();

castController.post("/create", isAuthMiddleware, async (req, res) => {
    const authorId = Number(req.user.id);

    try {
        const castData = await createCastSchema.parseAsync(req.body);

        const cast = await castService.createOne(castData, authorId);

        res.status(201).json(cast);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };

});

castController.get("/:castId", async (req, res) => {
    const castId = Number(req.params.castId);

    try {
        const actor = await castService.getById(castId);

        res.status(201).json(actor);
    } catch (error) {
        res.status(404).json(getErrorMessage(error));
    };
})

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

        const excludedCastIds = cast.map((x) => x.id);

        const filteredCast = await castService.getSelected(excludedCastIds);

        res.status(200).json(filteredCast);
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

});

castController.patch("/:castId", isAuthMiddleware, async (req, res) => {
    const castId = Number(req.params.castId);
    const userId = Number(req.user.id);
    const castData = req.body;

    try {
        const parsedCastData = await editCastSchema.parseAsync(castData);
        const cast = await castService.updateOne(castId, userId, parsedCastData);

        res.status(200).json({ cast });
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

castController.delete("/:castId", isAuthMiddleware, async (req, res) => {
    const castId = Number(req.params.castId);
    const userId = Number(req.user.id);

    try {
        const cast = await castService.removeById(castId, userId);

        res.status(200).json(`${cast.firstName} ${cast.lastName} has been deleted`);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
})

export default castController;