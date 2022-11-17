import { Router } from "express";
import { createQuestionTest, getQuestionsTest, removeQuestion, updateQuestion } from "../controllers/questionTest.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyQuestionValidator, isAdmin, paramIDValidator } from "../middlewares/validatorManager.js";

//import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

//* GET             /api/questions/:idTest   DEVUELVE LAS PREGUNTAS DE UN TEST ESPECIFICO
router.get("/:id", requireToken, getQuestionsTest);

//? POST            /api/questions/:idTest   CREA LAS PREGUNTAS DE UN TEST
router.post("/:id", requireToken, isAdmin, bodyQuestionValidator, createQuestionTest);

//! DELETE          /api/tests/:idQuestion   ELIMINA UNA PREGUNTA DE UN TEST SELECCIONADO
router.delete("/:id", requireToken, isAdmin, paramIDValidator, removeQuestion);

//TODO PATCH/PUT       /api/tests/:idQuestion   ACTUALIZA PARTE (PATCH) O TODO (PUT) DE UNA PREGUNTA
router.patch("/:id", requireToken, isAdmin, bodyQuestionValidator, updateQuestion);

export default router