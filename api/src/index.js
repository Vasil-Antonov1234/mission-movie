import express, { json } from "express";
import routes from "./routes.js";
import cors from "cors";

const app = express()

//Add CORS 
app.use(cors());

// Add json parser
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello from the backend")
})

app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}...`));