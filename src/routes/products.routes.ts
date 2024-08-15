import express from 'express';
import {create, get, remove} from '../controllers/product.controller'
import bodyParser from 'body-parser';
import { verifyToken } from '../middlewares/auth';
import multer from 'multer';

// Configurar multer

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.use(bodyParser.json());

router.get('/', get)
router.post('/', upload.single('image'), verifyToken, create);
router.delete('/:id', verifyToken, remove);

export default router;