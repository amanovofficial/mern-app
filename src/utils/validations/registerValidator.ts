import { check } from "express-validator";

export default [
  check("name","Введите имя").notEmpty(),
  check("phoneNumber","Введите номер телефона").notEmpty(),
  check("password","Пароль должен состоять как минимум из 6 символов").isLength({ min: 6 })
]