import express from 'express'
import config from './config.js'
import morgan from 'morgan'
import cors from 'cors'
import item_router from './routes/item.routes.js'
import image_router from './routes/image.routes.js'
import auth_router from './routes/auth.routes.js'
import { verifyToken } from './utils/verifyToken.js'

const app = express()

app.set('port', config.port)

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//rutas publicas
app.use(auth_router)

//rutas protegidas
app.use(verifyToken)
app.use(item_router)
app.use(image_router)

export default app