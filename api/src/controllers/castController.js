import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { createCastSchema } from "../schemas/castSchema.js";
import castService from "../services/castService.js";
import { getErrorMessage } from "../utils/errorUtil.js";

const castComtroller = Router();

castComtroller.post("/create", isAuthMiddleware, async (req, res) => {
    
    try {
        const castData = await createCastSchema.parse(req.body);

        const cast = await castService.createOne(castData);

        res.status(201).json(cast);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
    
})

export default castComtroller;