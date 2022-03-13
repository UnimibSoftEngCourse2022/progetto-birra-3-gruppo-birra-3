import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import EquipmentController from "../controllers/equipmentController";

const equipmentsRoutes = Router();

equipmentsRoutes.post("/", [authMiddleware], EquipmentController.create);

equipmentsRoutes.get("/", [authMiddleware], EquipmentController.findAll);

equipmentsRoutes.get("/:id", [authMiddleware], EquipmentController.findOne);

equipmentsRoutes.put("/:id", [authMiddleware], EquipmentController.update);

equipmentsRoutes.delete("/:id", [authMiddleware], EquipmentController.delete);

export default equipmentsRoutes;
