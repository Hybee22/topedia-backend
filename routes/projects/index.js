import express from "express";
import projectController from "../../controllers/projects/index.js";

const router = express.Router();

// CREATE PROJECT
router.post("/create", projectController.createProject);

// FETCH PROJECTS
router.get("/", projectController.getProjects);

// FETCH PROJECT BY ID
router.get("/:projectId", projectController.getProject);

// UPDATE PROJECT BY ID
router.patch("/:projectId", projectController.updateProject);

export default router;
