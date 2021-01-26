import { check } from "express-validator";

export default [
  check("phoneNumber","Введите номер телефона").notEmpty(),
  check("password","Введите пароль").notEmpty()
]