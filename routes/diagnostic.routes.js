import { Router } from "express";
import { getDiagnosticTest } from "../controllers/diagnostic.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

//* GET             /api/diagnostics/:idTest   DEVUELVE EL DIAGNOSTICO DE UN TEST ESPECIFICO
router.get("/:id", requireToken, getDiagnosticTest)

export default router