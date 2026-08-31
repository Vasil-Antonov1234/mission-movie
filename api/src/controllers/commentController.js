import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/authMiddleware";
import { getErrorMessage } from "../utils/errorUtil";
import { createCommentSchema } from "../schemas/commentSchema";
import commentService from "../services/commentService";

const commentController = Router();

commentController.post("/create", isAuthMiddleware, async (req, res) => {
    const content = req.body.content;
    const userId = Number(req.user.id);
    const movieId = Number(req.body.movieId);

   if (!content || !content.trim()) {
    res.status(400).json("Invalid data")
   }

   try {
    const parsedCommentData = await createCommentSchema.parseAsync({ content });

    const comment = await commentService.create(userId, movieId, parsedCommentData.content);

    res.status(201).json(comment);
   } catch (error) {
    res.status(400).json(getErrorMessage(error));
   };
})

export default commentController;