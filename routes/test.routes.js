import { Router } from "express";
import { createTest, getTest, getTests, removeTest, updateTest } from "../controllers/test.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyTestValidator, isAdmin, paramIDValidator } from "../middlewares/validatorManager.js";

const router = Router();

//* GET             /api/tests   DEVUELVE TODO LOS TESTS
router.get("/", requireToken, getTests);

//* GET             /api/tests/:id   DEVUELVE UN TEST ESPECIFICO
router.get("/:id", requireToken, getTest);

//? POST            /api/tests   CREA UN TEST NUEVO
router.post("/", requireToken, isAdmin, bodyTestValidator, createTest);

//! DELETE          /api/tests/:id   ELIMINA UN TEST SELECCIONADO
router.delete("/:id", requireToken, isAdmin, paramIDValidator, removeTest);

//TODO PATCH/PUT       /api/tests/:id   ACTUALIZA PARTE (PATCH) O TODO (PUT) EL TEST
router.patch("/:id", requireToken, isAdmin, paramIDValidator, bodyTestValidator, updateTest);

export default router