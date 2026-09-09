import { Router } from "express";
import passport from "passport";
import accessTokenUtil from "../utils/accessTokenUtil.js";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import { getErrorMessage } from "../utils/errorUtil.js";

const authController = Router();

authController.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

authController.get("/google/callback", passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login`, session: false }), (req, res) => {
    const user = req.user;

    const token = accessTokenUtil.generate(user);

    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
});

authController.get("/me", async (req, res) => {
    const token = req.headers["authorization"];

    if (!token) {
        res.status(401).json("Invalid token");
    };

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        await accessTokenUtil.check(token);

        const email = decodedToken.email;

        const user = await userRepository.fondByEmail(email);

        res.status(200).json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accessToken: token
        });
    } catch (error) {
        res.status(401).json(getErrorMessage(error));
    };
})

export default authController;