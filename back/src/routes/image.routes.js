import {Router} from 'express'

import {uploadImage} from '../controllers/image.controller.js'
import multer from 'multer';

const image_router = Router();
const upload = multer({ storage: multer.memoryStorage() });

image_router.post('/uploadImage', upload.single('file'), uploadImage);

export default image_router;