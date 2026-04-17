import express from "express";
import { createTermcondition, deleteTermcondition, getTermcondition, getTermconditionById, updateTermcondition } from "../controller/termcondition.controller.js";

const router = express.Router();

router.post("/add", createTermcondition);
router.get("/get-all", getTermcondition);
router.get("/get-by-id/:id", getTermconditionById);
router.put("/update/:id", updateTermcondition);
router.delete("/delete/:id", deleteTermcondition);

export default router;