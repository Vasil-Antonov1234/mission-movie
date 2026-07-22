import { Router } from "express";

const movieController = Router();

movieController.get("/", (req, res) => {
    res.json([]);
});

export default movieController;