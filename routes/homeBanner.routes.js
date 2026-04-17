import  express from "express";
import { createHomeBanner, deleteHomeBanner, getHomeBanner, getHomeBannerById, updateHomeBanner } from "../controller/homeBanner.controller.js";
import upload from "../middleware/upload.js";

const router =  express.Router();

router.post("/add",upload.single("bannerImage"), createHomeBanner);
router.get("/get-all", getHomeBanner);
router.get("/get-by-id/:id", getHomeBannerById);
router.put("/update/:id",upload.single("bannerImage"), updateHomeBanner);
router.delete("/delete/:id", deleteHomeBanner);

export default router;