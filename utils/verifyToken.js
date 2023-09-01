import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        res.status(401).json({
            success: false,
            message: "You're not authorized"
        });
    }

    // if is token exist then verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        res.user = user;
        next();
    })
};

// verifica se e um usuario ja cadastrado no sistema
export const verifyUser = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You're not authenticated"
            });
        }
    });
};

// verifica se e um administrador
export const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You're not authenticated"
            });
        }
    });
};