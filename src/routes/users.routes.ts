import multer from 'multer';
import express from 'express';
import {create, get, update, remove} from '../controllers/user.controller'
import bodyParser from 'body-parser';
import { verifyToken } from '../middlewares/auth';

// Configurar multer

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.use(bodyParser.json());

router.get('/', get)
router.post('/',  upload.single('image'), create);
router.put('/', update)
router.delete('/:id', verifyToken, remove);

export default router;