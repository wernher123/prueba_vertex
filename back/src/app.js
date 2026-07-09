import express from 'express'
import config from './config.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.set('port', config.port)

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

export default app