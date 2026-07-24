import { Router } from "express";

const userController = Router();

userController.post("/register", (req, res) => {

    res.json("Successfully registered");

})

export default userController;