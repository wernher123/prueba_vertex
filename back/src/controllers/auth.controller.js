import { getConnection } from '../database/connection.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config.js';
import querys from '../database/querys.js'

export const register = async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;

        if (!usuario || !contraseña) {
            return res.status(400).json({ 
                message: "Usuario y contraseña son requeridos" 
            });
        }

        const pool = await getConnection();

        // Verificar si el usuario ya existe
        const existingUser = await pool
            .request()
            .input('usuario', usuario)
            .query(querys.getUserByUsername);

        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ 
                message: "El usuario ya existe" 
            });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear usuario
        const result = await pool
            .request()
            .input('usuario', usuario)
            .input('contraseña', hashedPassword)
            .input('estado', 'activo')
            .query(querys.createUser);

        res.json({ 
            message: "Usuario registrado correctamente",
            success: true 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al registrar usuario",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;

        if (!usuario || !contraseña) {
            return res.status(400).json({ 
                message: "Usuario y contraseña son requeridos" 
            });
        }

        const pool = await getConnection();
        const result = await pool
            .request()
            .input('usuario', usuario)
            .query(querys.getUserByUsername);

        if (result.recordset.length === 0) {
            return res.status(401).json({ 
                message: "Usuario o contraseña incorrectos" 
            });
        }

        const user = result.recordset[0];

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: "Usuario o contraseña incorrectos" 
            });
        }

        // Verificar estado
        if (user.estado !== 'activo') {
            return res.status(403).json({ 
                message: "Usuario inactivo" 
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id_usuario: user.id_usuario, usuario: user.usuario },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        res.json({
            message: "Login exitoso",
            token: token,
            user: {
                id_usuario: user.id_usuario,
                usuario: user.usuario
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message
        });
    }
};