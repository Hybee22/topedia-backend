import express from "express";
import subTaskController from "../../controllers/sub-tasks/index.js";

const router = express.Router();

// CREATE SUB-TASK
router.post("/create", subTaskController.createSubTask);

export default router;
