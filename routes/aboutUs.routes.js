import express from 'express';
import { createAboutUs, deleteAboutUs, getAboutUdById, getAboutUs, updateAboutUs } from '../controller/aboutUs.controller.js';

const router = express.Router();

router.post("/add", createAboutUs);
router.get("/get-all", getAboutUs);
router.get("/get-by-id/:id", getAboutUdById);
router.put("/update/:id", updateAboutUs);
router.delete("/delete/:id", deleteAboutUs);

export default router;