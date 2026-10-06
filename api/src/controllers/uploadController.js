import { Router } from "express";
import multer from "multer";
import { isAuthMiddleware } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import supabase from "../config/supabase.js";

const uploadController = Router();

const upload = multer({ storage: multer.memoryStorage() });

uploadController.post("/poster", isAuthMiddleware, upload.single("poster"), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        };

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ message: "Only JPG, PNG and WebP images are allowed."});
        };

        if (file.size > 3 * 1024 * 1024) {
            return res.status(400).json({ message: "Image must be lower than 3MB."});
        };

        const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, "-")}`;

        const { error } = await supabase.storage.from("posters").upload(fileName, file.buffer, { contentType: file.mimetype });

        if (error) {
            throw error;
        };

        const { data } = supabase.storage.from("posters").getPublicUrl(fileName);

        res.status(200).json({ url: data.publicUrl });
    } catch (error) {
        res.status(500).json(getErrorMessage(error));
    };
})

export default uploadController;