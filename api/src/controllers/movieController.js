import { Router } from "express";

const movieController = Router();

movieController.get("/", (req, res) => {   
    console.log(req.user);

    // get all
    res.json([]);
});

export default movieController;