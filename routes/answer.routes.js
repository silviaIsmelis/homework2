import { Router } from "express";
import { getAnswersTest, getAnswerTest, updateAnswer } from "../controllers/answer.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

//* GET             /api/answers/:idTest   DEVUELVE LAS RESPUESTAS DE UN TEST ESPECIFICO
router.get("/:id", requireToken, getAnswersTest);

//? POST             /api/answers/:idTest/:idQuestion   RESPUESTA A UNA PREGUNTA DE UN TEST ESPECIFICO
router.post("/:id/:qId", requireToken, getAnswerTest);

//TODO PATCH/PUT       /api/tests/:idAnswer   ACTUALIZA PARTE (PATCH) O TODO (PUT) LA RESPUESTA
router.patch("/:id", requireToken, updateAnswer);

export default router