import 'reflect-metadata'
import express from 'express'
import { router } from "./routes"

import './database' // já importa o arquivo index.ts dentro

const app = express()

app.use(express.json())

app.use(router)

app.listen(3000, () => console.log('Porta: 3000')) 

 