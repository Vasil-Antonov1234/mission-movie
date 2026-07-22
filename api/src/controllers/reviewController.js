import { Router } from "express"; 

const reviewController = Router();

reviewController.get("/", (req, res) => {
    
    // get all
    res.json([]);
})

export default reviewController;