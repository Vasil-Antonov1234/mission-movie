import { Router } from "express";
import { createUserSchema } from "../schemas/userSchema.js";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import accessTokenUtil from "../utils/accessTokenUtil.js";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";

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
            isuserGoogleUser: false,
            accessToken: token,
            createdAt: user.createdAt
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
            accessToken: token,
            isGoogleUser: false,
            createdAt: user.createdAt
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
});

userController.get("/added-films-count/:userId", async (req, res) => {
    const userId = Number(req.params.userId);
    
    try {
        const count = await userService.getAddedFilmsCount(userId);
        res.status(200).json({ count });
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

userController.patch("/edit-profile", isAuthMiddleware, async (req, res) => {
    const userId = Number(req.user.id);
    const data = req.body;

    try {
        const result = await userService.edit(userId, data);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
})

export default userController;