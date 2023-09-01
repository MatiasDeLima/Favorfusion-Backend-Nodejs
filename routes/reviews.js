import express from "express";
import { createReview } from "./../controllers/reviewController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// create review
router.post("/:foodId", verifyUser, createReview);

export default router;