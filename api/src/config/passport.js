import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../lib/prisma.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
    async (_accessToken, _refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0].value;
            const firstName = profile.name?.givenName ?? profile.displayName ?? "Unknown";
            const lastName = profile.name?.familyName ?? "";

            if (!email) {
                return done(new Error("No email received from Google"));
            };

            let user = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        email,
                        firstName,
                        lastName,
                        password: null
                    }
                });
            };

            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }
));

export default passport;