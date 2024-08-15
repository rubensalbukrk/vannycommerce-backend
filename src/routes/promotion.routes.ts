import express from 'express';
import {create, get, remove, update} from '../controllers/product.controller'
import bodyParser from 'body-parser';
import { verifyToken } from '../middlewares/auth';


const router = express.Router();

router.use(bodyParser.json());

router.post('/', create);
router.get('/', get);
router.put('/', update)
router.delete('/:id', verifyToken, remove)

export default router;

