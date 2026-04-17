import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controller/blog.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("image"), createBlog);
router.get("/get-all", getAllBlogs);
router.get("/get-by-id/:id", getBlogById);
router.put("/update/:id", upload.single("image"), updateBlog);
router.delete("/delete/:id", deleteBlog);

export default router;
