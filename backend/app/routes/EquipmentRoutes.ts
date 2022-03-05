import EquipmentController from "../controllers/EquipmentController";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", [authMiddleware], EquipmentController.create);

router.get("/", [authMiddleware], EquipmentController.findAll);

router.get("/:id", [authMiddleware], EquipmentController.findOne);

router.put("/:id", [authMiddleware], EquipmentController.update);

router.delete("/:id", [authMiddleware], EquipmentController.delete);

export default router;
