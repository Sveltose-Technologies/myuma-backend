import express from "express";
import { footerCreate, footerDelete, footerGetAll, footerGetById, footerUpdate } from "../controller/footer.controller.js";

const router = express.Router();

router.post("/add", footerCreate),
router.get("/get-all", footerGetAll),
router.get("/get-by-id/:id", footerGetById),
router.put("/update/:id", footerUpdate),
router.delete("/delete/:id", footerDelete)

export default router;