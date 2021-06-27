import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import "express-async-errors"

import { router } from "./routes"

import './database' // já importa o arquivo index.ts dentro

const app = express()

app.use(express.json())

app.use(router)

// middleware que pega os erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({ error: err.message })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(3000, () => console.log('Porta: 3000')) 

 