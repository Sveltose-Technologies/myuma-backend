import express from "express";
import { createPricing, deletePricing, getAllPricing, getSinglePricing, updatePricing } from "../controller/pricing.controller.js";
// import {
//   createPricing,
//   getAllPricing,
//   getSinglePricing,
//   updatePricing,
//   deletePricing,
// } from "../controllers/pricing.controller.js";

const router = express.Router();

/* CRUD Routes */
router.post("/add", createPricing);
router.get("/get-all", getAllPricing);
router.get("/get-by-id/:id", getSinglePricing);
router.put("/update/:id", updatePricing);
router.delete("/delete/:id", deletePricing);

export default router;