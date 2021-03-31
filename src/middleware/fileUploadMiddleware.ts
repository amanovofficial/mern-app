import { Request } from "express";
import multer from 'multer'
import moment from "moment";
import path from "path";

const storage = multer.diskStorage({

    destination(req: Request, file: Express.Multer.File, cb) {
        cb(null, './images/ads')
    },
    filename(req: Request, file: Express.Multer.File, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        const fileName = `${date}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']
var limits = {
    files: 10,
    fileSize: 1024 * 1024 * 10, // 1 MB (max file size)
};
const fileFilter = ((req: Request, file: Express.Multer.File, cb: any) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
        return cb(new Error('Разрешены только следующие форматы фотографии: .png, .jpg и .jpeg'))
    }
})

export default multer({ storage, limits, fileFilter })