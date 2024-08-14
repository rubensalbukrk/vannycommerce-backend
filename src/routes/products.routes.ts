import express from 'express';
import {create, get, update, remove} from '../controllers/product.controller'
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', get)
router.post('/', create);
router.put('/', update)
router.delete('/', remove);

export default router;