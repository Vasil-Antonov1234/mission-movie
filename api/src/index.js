import express from "express";

const app = express()

app.get("/", (req, res) => {
    res.send("Hello from the backend")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}...`));