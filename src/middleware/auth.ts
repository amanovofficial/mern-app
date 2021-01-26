import jwt from 'jsonwebtoken';
import keys from '../config/keys.dev';
import { Request, Response, NextFunction } from "express";

const { JWT_SECRET_KEY } = keys;

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    // Check for token
    if (!token)
        return res.status(401).json({ message: 'Нет токена, в авторизации отказано' });

    try {

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        // Add user from payload
        res.locals.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Не валидный токен' });
    }
};