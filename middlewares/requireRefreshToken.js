import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../util/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
    
        if(!refreshTokenCookie)
         throw new Error("No existe el token...");

        const {uId} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uId = uId;
        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({error: tokenVerificationErrors[error.message]});
    }
};