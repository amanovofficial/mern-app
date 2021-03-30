import { check } from "express-validator";

export default [
  check("region","Укажите район").notEmpty(),
  check("numberOfRooms","Укажите количество комнат").notEmpty(),
  check("floor","Укажите этаж").notEmpty(),
  check("numberOfStoreys","Укажите этажность дома").notEmpty(),
  check("cost","Укажите стоимость аренды").notEmpty(),
  check("currency","Укажите валюту").notEmpty(),
  check("rooms","Укажите тип планировки комнат").notEmpty(),
  check("lavatory","Укажите тип планировки санузла").notEmpty(),
]