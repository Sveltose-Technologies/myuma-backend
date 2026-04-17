import express  from "express"
import { deleteAuth, forgetPassword, getAuth, getAuthById, login, resetPassword, signUp, updateAuth, verifyOtp } from "../controller/auth.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/signup", upload.single("profileImage"), signUp );
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgetPassword);
router.put("/reset-password", resetPassword);
router.get("/get-all", getAuth );
router.get("/get-by-id/:id", getAuthById);
router.delete("/delete/:id", deleteAuth);
router.put("/update/:id", upload.single("profileImage"), updateAuth);

export default router;