import express from "express";
import { createBlogCategory, deleteBlogCategory, getAllBlogCategories, getBlogCategoryById, updateBlogCategory } from "../controller/blogCategory.controller.js";

const router = express.Router();

router.post("/add", createBlogCategory);
router.get("/get-all", getAllBlogCategories);
router.get("/get-by-id/:id", getBlogCategoryById);
router.put("/update/:id", updateBlogCategory);
router.delete("/delete/:id", deleteBlogCategory);

export default router;
