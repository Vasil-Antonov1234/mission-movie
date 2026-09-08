import { Router } from "express";
import passport from "passport";
import accessTokenUtil from "../utils/accessTokenUtil.js";

const authController = Router();

authController.get("/google", { scope: ["profile", "email"], session: false });

authController.get("/google/callback", passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login`, session: false }), (req, res) => {
    const user = req.user;

    const token = accessTokenUtil.generate(user);

    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
});

export default authController;