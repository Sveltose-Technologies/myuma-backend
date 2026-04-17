import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controller/newListing.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.array("images", 10), createListing);
router.get("/get-all", getAllListings);
router.get("/get-by-id/:id", getListingById);
router.put("/update/:id", upload.array("images", 10), updateListing);
router.delete("/delete/:id", deleteListing);

export default router;