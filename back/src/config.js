import {config} from 'dotenv'
config()

export default {
    port: process.env.PORT || 3030,
    jwtSecret: process.env.JWT_SECRET || 'tu_secreto_muy_seguro_aqui'
}