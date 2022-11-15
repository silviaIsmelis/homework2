import { Router } from "express";
import { infoUser, login, register, refreshToken, loggout } from "../controllers/auth.controller.js";
import { body } from "express-validator"
import { validationAuth } from "../middlewares/validationAuth.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.post(
    '/register', 
    [
        body('email', "Formato de email incorrecto..")
        .trim()
        .isEmail()
        .normalizeEmail(),
        body('password', "Formato de password incorrecto, minimo 6 caracteres..").trim().isLength( {min: 6} ),
        body('password', "Formato de password incorrecto...")
        .custom((value, { req }) => {
            if(value !== req.body.repassword)
            {
                throw new Error("No coinciden las contraseñas");
            }
            return value;                
        }) 
    ], 
    validationAuth,
    register
);

router.post(
    '/login', 
    [
        body('email', "Formato de email incorrecto..")
        .trim()
        .isEmail()
        .normalizeEmail(),
        body('password', "Formato de password incorrecto, minimo 6 caracteres..")
        .trim()
        .isLength( {min: 6} )
    ],
    validationAuth,
    login
);


router.get("/protected", requireToken, infoUser)

router.get("/refresh", refreshToken);

router.get("/loggout", loggout);

export default router