import express from 'express';
import {create, get, remove } from '../controllers/product.controller'
import bodyParser from 'body-parser';
import { verifyToken } from '../middlewares/auth';

const multer = require('multer');
// Configuração do multer
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.use(bodyParser.json());

router.post('/', upload.single('image'), create);
router.get('/', get);
router.delete('/:id', verifyToken, remove)

export default router;

