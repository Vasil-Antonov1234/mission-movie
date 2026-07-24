import { Router } from "express";
import { createUserSchema } from "../schemas/userSchema.js";
import userService from "../services/userService.js";

const userController = Router();

userController.post("/register", async (req, res) => {

    try {
        const userData = await createUserSchema.parseAsync(req.body);

        const user = await userService.register(userData);

        res.status(200).json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accessToken: "accessToken"
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };

})

export default userController;