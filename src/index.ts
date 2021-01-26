import { Application, Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan';
import startServer from "./core/startServer";
// Routes
import authRoutes from "./routes/authRoutes";
const app: Application = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/auth', authRoutes)

startServer(app)
