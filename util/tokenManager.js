import jwt from "jsonwebtoken";

export const generateToken = (uId) => {
    const expiresIn = 60 * 15;

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