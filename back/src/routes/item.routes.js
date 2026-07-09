import {Router} from 'express'
import { getItems } from '../controllers/item.controller.js'

const item_router = Router()

item_router.get('/getItems', getItems)

export default item_router