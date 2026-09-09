import express, { json } from "express";
import routes from "./routes.js";
import cors from "cors";
import { AuthMiddleware } from "./middlewares/authMiddleware.js";
import passport from "./config/passport.js";

const app = express()

//Add CORS 
app.use(cors());

// Add json parser
app.use(express.json())

// Add Auth Middleware
app.use(AuthMiddleware);

// Initialize Passport
app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("Hello from the backend");
});

app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}...`));