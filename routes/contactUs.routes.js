import express from "express";
import { messageDelete, messageGetAll, messageGetById, messageUpdate, sendMessage } from "../controller/contactUs.controller.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/get-all", messageGetAll);
router.get("/get-by-id/:id", messageGetById);
router.put("/update/:id", messageUpdate);
router.delete("/delete/:id", messageDelete);

export default router;