import { Application } from "express";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan';
import startServer from "./core/startServer";
// Routes
import authRoutes from "./routes/authRoutes";
import adRoutes from "./routes/adRoutes";
import userRoutes from "./routes/userRoutes";
const app: Application = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../images/ads'))
app.use('/api/auth', authRoutes)
app.use('/api/ads', adRoutes)
app.use('/api/users', userRoutes)

startServer(app)
