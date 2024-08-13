import express,{Router, Response, Request} from 'express';
import {create, get} from '../controllers/produto.controller'
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', get)
router.post('/', create);


export default router;