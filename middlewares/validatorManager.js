import { validationResult, body, param } from "express-validator";
import { User } from "../models/User.js";
import axios from "axios";

export const validationAuth = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json( { errors: errors.array() } );
    }

    next();
}

export const paramIDValidator = [
    param("id", "Formato no valido (expressValidator)")
    .trim()
    .notEmpty()
    .escape(),
    validationAuth
]

export const bodyLinkValidator = [
    body("longLink", "Formato link incorrecto...")
    .trim()
    .notEmpty()
    .custom(async (value) => {
        try {
            if(!value.startsWith("https://")){
                value = "https://" + value;
            }

            await axios.get(value);
            return value;
        } catch (error) {
            //console.log(error);
            throw new Error("Not found longLink 404");
        }                
    }),
    validationAuth
]

export const bodyRegisterValidator = [
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
        }),
        validationAuth,
];

export const bodyLoginValidator = [
    body('email', "Formato de email incorrecto..")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password', "Formato de password incorrecto, minimo 6 caracteres..")
    .trim()
    .isLength( {min: 6} ),
    validationAuth,
];

//? VALIDAR QUE EL USUARIO ES ADMIN
export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.uId);
        if(user.admin === true){
            next();
            return;
        }
  
        return res.status(403).json({ message: "No esta autorizado para realizar el CRUD!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  };

//* VALIDACIONES DE LOS TESTS
export const bodyTestValidator = [
    body('nameTest', "Nombre del test vacio...")
    .trim()
    .notEmpty(),
    validationAuth,
];


//* VALIDACIONES DE LAS PREGUNTAS
export const bodyQuestionValidator = [
    body('description', "Pregunta vacia o incorrecta...")
    .trim()
    .notEmpty(),
    validationAuth,
];




     