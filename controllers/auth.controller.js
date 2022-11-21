import { Answer } from "../models/Answer.js";
import { Test } from "../models/Test.js";
import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../util/tokenManager.js";

//! REGISTRAR UN USUARIO
export const register = async(req, res) => {
    const {name, email, password, phone, address, relationship} = req.body;
    const username = email.split("@")[0];
    const adminP = false;

    try {
        //Alternativa de busqueda de email
        let user = await User.findOne({email});
        if(user) throw ({code: 11000})

        user = new User({username, name, email, password, phone, address, relationship, admin: adminP});
        console.log(user);
        await user.save();

         //Generacion de Token
         const {token, expiresIn} = generateToken(user.id);
         generateRefreshToken(user.id, res);

        return res.status(201).json({token, expiresIn});
    } catch (error) {
        //Alternativa por defecto mongoose
        if(error.code === 11000)
        {
            return res.status(400).json({error: "Ya existe el usuario"});
        }
        res.status(500).json({error: "Error de servidor..."});
    }
    
}

//? LOGIN DE UN USUARIO
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

        return res.status(201).json({token, expiresIn});
        //return res.json({ok: true});
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
        res.status(500).json({error: "Error de servidor..."});
    }
}

//TODO REFRES TOKEN - SEGURIDAD
export const refreshToken = (req, res) => {
    try {    
        const {token, expiresIn} = generateToken(req.uId);

        return res.json({token, expiresIn});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error de servidor..."});
    }   
}

//TODO LOGGOUT DE UN USUARIO - ELIMINA EL TOKEN
export const loggout = (req, res) => {
    res.clearCookie(refreshToken);
    res.json({ok: loggout});
}


