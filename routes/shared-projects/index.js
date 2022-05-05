import express from "express";
import sharedProjectController from "../../controllers/shared-projects/index.js";

const router = express.Router();

// SHARE PROJECT
router.post("/share", sharedProjectController.sharedProject);

// // FETCH SHARED PROJECTS
// router.get("/", sharedProjectController.getSharedProjects);

// // FETCH SHARED PROJECT BY ID
// router.get("/:projectId", sharedProjectController.getSharedProject);

// // UPDATE SHARED PROJECT BY ID
// router.patch("/:projectId", sharedProjectController.updateSharedProject);

export default router;
