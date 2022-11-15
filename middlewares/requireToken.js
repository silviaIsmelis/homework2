import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try {

        let token = req.headers?.authorization;
        if(!token) 
            throw new Error("No existe el token en el header, usa Bearer");

        token = token.split(" ")[1];
        const {uId} = jwt.verify(token, process.env.JWT_SECRET);
        req.uId = uId;

        next();

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
};




/*
export const requireToken = (req, res, next) => {
    try {

        let token = req.cookies.token;
        if(!token) 
            throw new Error("No existe el token en el header, usa Bearer");

        //token = token.split(" ")[1];
        const {uId} = jwt.verify(token, process.env.JWT_SECRET);
        req.uId = uId;

        next();

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
};
*/


//respaldo
/*
*/