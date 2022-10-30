import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator"
import { validationAuth } from "../middlewares/validationAuth.js";
const router = express.Router();

router.post(
    '/register', 
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



export default router