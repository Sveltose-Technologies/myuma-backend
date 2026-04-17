import express from "express";
import { deleteComment, getAllComments, getCommentById, sendComment, updateComment } from "../controller/comment.controller.js";

const router = express.Router();

router.post("/send",sendComment);
router.get("/get-all", getAllComments);
router.get("/get-by-id/:id", getCommentById);
router.delete("/delete/:id", deleteComment);
router.put("/update/:id", updateComment);

export default router;