import { Application, Request, Response } from "express";
import express from "express";

const app: Application = express()
const PORT: number = 5000 || process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Index Page')
})

app.listen(PORT, () => console.log('Server has been started on port ', PORT))