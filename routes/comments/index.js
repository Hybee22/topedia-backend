import express from "express";
import commentController from "../../controllers/comments/index.js";

const router = express.Router();

// CREATE COMMENT
router.post("/create", commentController.createComment);

export default router;
