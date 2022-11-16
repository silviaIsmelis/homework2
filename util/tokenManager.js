import jwt from "jsonwebtoken";

export const generateToken = (uId) => {
    const expiresIn = 60 * 30;

    try {
        const token = jwt.sign({ uId }, process.env.JWT_SECRET, { expiresIn });
        return {token, expiresIn}
    } catch (error) {
        console.log(error);
    }
}

export const generateRefreshToken = (uId, res) => {
    const expiresIn = 60 * 60 * 24 * 30;

    try {
        const refreshToken = jwt.sign({ uId }, process.env.JWT_REFRESH, { expiresIn });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        });

    } catch (error) {
        console.log(error);
    }
}

export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es valida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no valido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "JWT formato no valido",
};