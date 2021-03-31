import { Router } from "express";
import checkRoles from "../middleware/checkRoles";
import {
    getUsers,
    blockingOrUnblockingUser,
    remove
} from "../controllers/userController";

const router = Router()

router.get('/', checkRoles(['admin']), getUsers)
router.put('/changeAccess/:id', checkRoles(['admin']), blockingOrUnblockingUser)
router.delete('/:id', checkRoles(['admin']), remove)

export default router