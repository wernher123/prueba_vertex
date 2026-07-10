import jwt from 'jsonwebtoken'
import config from '../config.js'

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                message: "Token no proporcionado" 
            });
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: "Token expirado" 
            });
        }
        return res.status(401).json({ 
            message: "Token inválido" 
        });
    }
};