import { Request, Response, NextFunction } from "express";
import AdModel, { IAd } from "../models/Ad";
export default async (req: Request, res: Response, next: NextFunction) => {
    const ad:IAd = await AdModel.findById(req.params.id)
    const { user } = res.locals
    const allowEdit:boolean = (user.role === 'admin') || (user.id == ad.userID)
    if (allowEdit) {
        next();
    } else {
        res.status(400).json({ message: 'Вы не имеете право доступа на редактирования' });
    }
}
