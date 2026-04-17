import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controller/category.controller.js';

const router = express.Router();

router.post("/add", createCategory);
router.get("/get-all", getAllCategories);
router.get("/get-by-id/:id", getCategoryById);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;

