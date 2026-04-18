import express from "express"
import { ratingDelete, ratingGetAll, ratingGetById, ratingSend, ratingUpdate,  } from "../controller/rating.controller.js"

const router = express.Router() 

router.post("/add", ratingSend),
router.get("/get-all", ratingGetAll),
router.get("/get-by-id/:id", ratingGetById),
router.put("/update/:id", ratingUpdate),
router.delete("/delete/:id", ratingDelete)

export default router;