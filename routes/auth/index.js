import express from "express";
import authController from "../../controllers/auth/index.js";

const router = express.Router();

// REGISTRATION
router.post("/register", authController.handleRegister);

// LOGIN
router.post("/login", authController.handleLogin);

export default router;
