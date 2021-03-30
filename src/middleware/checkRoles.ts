import jwt from 'jsonwebtoken';
import config from '../config';
import { Request, Response, NextFunction } from "express";

const { JWT_SECRET_KEY } = config;

const checkRoles = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {

    const token: string | undefined = req.header('Authorization');

    if (!token)
        return res.status(401).json({ message: 'Нет токена, в авторизации отказано' });

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
        
        if (!roles.includes(decoded.role)) throw Error('Не валидный токен')
        res.locals.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export default checkRoles