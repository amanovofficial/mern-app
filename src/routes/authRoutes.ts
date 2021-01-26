import { Router } from "express";
import { register, login, getUser } from "../controllers/authController";
import auth from "../middleware/auth";
import registerValidation from "../utils/validations/registerValidator";
import loginValidator from "../utils/validations/loginValidator";
const router = Router()

router.post('/register', registerValidation, register)

router.post('/login', loginValidator, login)

router.get('/user', auth, getUser)

export default router