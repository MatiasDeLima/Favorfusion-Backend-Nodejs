import express from "express";
import { createFood, deleteFood, getAllFood, getDiscountFood, getFoodBySearch, getFoodCount, getSingleFood, updateFood } from "./../controllers/foodController.js";

const router = express.Router();

// create food router
router.post("/", createFood);

// update food router
router.put("/:id", updateFood);

// delete food router
router.delete("/:id", deleteFood);

// get single food router
router.get("/:id", getSingleFood);

// get all foods router
router.get("/", getAllFood);

// seach food router pesquisa de acordo com as KEY
router.get("/search/getFoodBySearch", getFoodBySearch);
// routar individual para o discount so que com o mesmo nome
router.get("/search/getDiscountFood", getDiscountFood);
// pega a quantodade de produtos
router.get("/search/getFoodCount", getFoodCount);

export default router;