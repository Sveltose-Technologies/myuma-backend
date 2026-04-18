import express from "express"
import { bookNowCreate, deleteItems, getAllItems, itemsGetById, updateItem,  } from "../controller/bookNow.controller.js";

const router = express.Router();

router.post("/add",bookNowCreate ),
router.get("/get-all", getAllItems),
router.get("/get-by-id/:id", itemsGetById),
router.put("/update/:id", updateItem),
router.delete("/delete/:id", deleteItems)

export default router;