import { Router } from "express";
import { createUserSchema } from "../schemas/userSchema.js";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import accessTokenUtil from "../utils/accessTokenUtil.js";
import { isAdmin, isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { changePasswordSchema } from "../schemas/passwordSchema.js";

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
        res.status(400).json({ error: getErrorMessage(error) })
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
            createdAt: user.createdAt,
            role: user.role
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
});

userController.patch("/change-password", isAuthMiddleware, async (req, res) => {
    const userId = Number(req.user.id);
    const newHashedPassword = await (await changePasswordSchema.parseAsync(req.body)).password;
    const oldPassword = req.body.currentPassword;
    const email = req.user.email;

    try {
        await userService.changePassword(userId, newHashedPassword, oldPassword, email);
        res.status(200).json("Password updated successfully")
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

userController.delete("/:userId/delete", isAuthMiddleware, async (req, res) => {
    const userId = Number(req.params.userId);

    try {
        const result = await userService.remove(userId);

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(getErrorMessage(error));
    };
});

userController.get("/favorite-movies", isAuthMiddleware, async (req, res) => {
    const userId = Number(req.user.id);

    try {
      const result = await userService.getFavoriteMovies(userId);
      
      res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

userController.delete("/favorites/:movieId/remove", isAuthMiddleware, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.user.id);

    try {
        const result = await userService.removeFromFavorites(movieId, userId);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

userController.get("/watchlist", isAuthMiddleware, async (req, res) => {
    const userId = Number(req.user.id);

    try {
        const result = await userService.getWatchlist(userId);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

userController.delete("/watchlist/:movieId/remove", isAuthMiddleware, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.user.id);

    try {
        const result = await userService.removeFromWatchlist(movieId, userId);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

userController.get("/get-all", isAuthMiddleware, isAdmin, async (req, res) => {    
    try {
        const users = await userService.getAll();

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };

})

export default userController;