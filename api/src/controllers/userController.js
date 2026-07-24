import { Router } from "express";
import { createUserSchema } from "../schemas/userSchema.js";
import userService from "../services/userService.js";

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
        return res.status(400).json({ error: error.message });
    };

})

userController.get("/logout", (req, res) => {

    // TODO invalidate access token

    res.json({ message: "Logout successful" });
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
        return res.status(400).json(error.message);
    }
})

export default userController;