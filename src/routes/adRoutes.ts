import { Router } from "express";
import { create, getAllAds, getOneAd, getAdAuthor, update, remove, publishOrIgnore } from "../controllers/adController";
import fileUploadMiddleware from "../middleware/fileUploadMiddleware";
import adValidator from "../utils/validations/adValidator";
import checkRoles from "../middleware/checkRoles";
import allowEdit from "../middleware/allowEdit";
const router = Router()

router.post('/create', checkRoles(['user']), fileUploadMiddleware.any(), adValidator, create)
router.get('/', getAllAds)
router.get('/my', checkRoles(['user']), getAllAds)
router.get('/admin-ads', checkRoles(['admin']), getAllAds)
router.get('/:id', getOneAd)
router.get('/adAuthor/:id', getAdAuthor)
router.put('/edit/:id', checkRoles(['user', 'admin']), allowEdit, fileUploadMiddleware.any(), adValidator, update)
router.put('/publishOrIgnore/:id', checkRoles(['admin']), publishOrIgnore)//isAdmin
router.delete('/delete/:id', checkRoles(['user', 'admin']), remove)

export default router