import express from "express";
import { login, register } from "./../controllers/authController.js";

const router = express.Router();

// register router
router.post("/register", register);

// login router
router.post("/login", login);

export default router;