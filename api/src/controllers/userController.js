import { Router } from "express";
import { createUserSchema } from "../schemas/userSchema.js";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import accessTokenUtil from "../utils/accessTokenUtil.js";

const userController = Router();

userController.post("/register", async (req, res) => {

    try {
        const userData = await createUserSchema.parseAsync(req.body);

        const { user, token } = await userService.register(userData);

        res.status(200).json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accessToken: token
        });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    };

})

userController.get("/logout", async (req, res) => {

    const token = req.headers["authorization"];

    try {
        
        await accessTokenUtil.invalidate(token);
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error)} )         
    }

})

userController.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, token } = await userService.login(email, password);

        res.json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accessToken: token
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
})

export default userController;