import express from 'express'
import config from './config.js'
import morgan from 'morgan'
import cors from 'cors'
import item_router from './routes/item.routes.js'
import image_router from './routes/image.routes.js'

const app = express()

app.set('port', config.port)

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(item_router)
app.use(image_router)

export default app