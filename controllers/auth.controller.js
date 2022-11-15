import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../util/tokenManager.js";
//import { validationResult } from "express-validator";

export const register = async(req, res) => {
    console.log(req.body);
    //const {username, name, email, password, phone, address, relationship, admin} = req.body;
    const {email, password} = req.body;

    try {
        //Alternativa de busqueda de email
        let user = await User.findOne({email});
        if(user) throw ({code: 11000})

        user = new User({email, password})
        await user.save();

        //jwt
        return res.status(201).json({ok: true});
    } catch (error) {
        //Alternativa por defecto mongoose
        if(error.code === 11000)
        {
            return res.status(400).json({error: "Ya existe el usuario"});
        }
        res.status(500).json({error: "Error de servidor..."});
    }
    
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email});
        if(!user) 
            return res.status(403).json({error:"Usuario no registrado..."});

        const requeridPassword = await user.comparePassword(password);
        if(!requeridPassword)
            return res.status(403).json({error:"Credenciales incorrectas..."});

        //Generacion de Token
        const {token, expiresIn} = generateToken(user.id);
        generateRefreshToken(user.id, res);

        //Uso de cookie parser
        /*res.cookie("token", token, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer")
        });*/

        return res.json({token, expiresIn});
        return res.json({ok: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error de servidor..."});
    } 
}

export const infoUser = async(req, res) => {
    try {
        const user = await User.findById(req.uId).lean();
        return res.json({email: user.email, uId: user.id});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const refreshToken = (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
    
        if(!refreshTokenCookie)
         throw new Error("No existe el token...");

        const {uId} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        const {token, expiresIn} = generateToken(uId);

        return res.json({token, expiresIn});
        
    } catch (error) {
        console.log(error);

        const tokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es valida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no valido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "JWT formato no valido",
        };

        return res.status(401).json({error: error.message});
    }   
}

export const loggout = (req, res) => {
    res.clearCookie(refreshToken);
    res.json({ok: loggout});
}


