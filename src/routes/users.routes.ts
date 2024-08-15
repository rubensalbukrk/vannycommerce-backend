import express from 'express';
import {create, get, update, remove} from '../controllers/user.controller'
import bodyParser from 'body-parser';
import { verifyToken } from '../middlewares/auth';


const router = express.Router();

router.use(bodyParser.json());

router.get('/', get)
router.post('/', create);
router.put('/', update)
router.delete('/:id', verifyToken, remove);

export default router;