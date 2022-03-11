import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import EquipmentController from "../controllers/equipmentController";

const router = Router();

router.post("/", [authMiddleware], EquipmentController.create);

router.get("/", [authMiddleware], EquipmentController.findAll);

router.get("/:id", [authMiddleware], EquipmentController.findOne);

router.put("/:id", [authMiddleware], EquipmentController.update);

router.delete("/:id", [authMiddleware], EquipmentController.delete);

export default router;