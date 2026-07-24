import { Router } from "express";

const userController = Router();

userController.post("/register", (req, res) => {

    console.log(req.body);
    res.json("Successfully registered");

})

export default userController;