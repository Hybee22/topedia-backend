import express from "express";
import taskController from "../../controllers/tasks/index.js";

const router = express.Router();

// CREATE TASK
router.post("/create", taskController.createTask);

export default router;
