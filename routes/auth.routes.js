import { Router } from "express";
import { infoUser, login, register, refreshToken, loggout } from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";

const router = Router();

//? AUTENTICACION Y LOGIN DEL USUARIO
router.post('/register', bodyRegisterValidator, register);
router.post('/login', bodyLoginValidator, login);


//router.get("/protected", requireToken, infoUser)
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/loggout", loggout);

export default router