import  express from "express";
import { addLogo, deleteLogo, getLogo, getLogoById, updateLogo } from "../controller/logo.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("logo") ,addLogo);
router.get("/get-all", getLogo);
router.get("/get-by-id/:id", getLogoById);
router.put("/update/:id", upload.single("logo"), updateLogo);
router.delete("/delete/:id", deleteLogo);

export default router;

