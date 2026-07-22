import { Router } from "express";

const movieController = Router();

movieController.get("/", (req, res) => {
    
    // get all
    res.json([]);
});

export default movieController;