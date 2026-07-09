import {Router} from 'express'
import { addItem, deleteItem, getItemById, getItems, updateItem } from '../controllers/item.controller.js'

const item_router = Router()

item_router.get('/getItems', getItems)
item_router.get('/getItemById/:id_item', getItemById)

item_router.post('/addItem', addItem)
item_router.put('/updateItem', updateItem)
item_router.delete('/deleteItem/:id_item', deleteItem)

export default item_router