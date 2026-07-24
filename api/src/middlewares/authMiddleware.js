import jwt from "jsonwebtoken";

export function AuthMiddleware(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return next();
    };

    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    };``
}