import express from "express";
import { createPrivacyPolicy, deletePrivacyPolicy, getAllPrivacyPolicy, getPrivacyPolicyById, updatePrivacyPolicy } from "../controller/privacyPolicy.controller.js";

const router = express.Router();

router.post("/add", createPrivacyPolicy);
router.get("/get-all", getAllPrivacyPolicy);
router.get("/get-by-id/:id", getPrivacyPolicyById);
router.put("/update/:id", updatePrivacyPolicy);
router.delete("/delete/:id", deletePrivacyPolicy);

export default router;