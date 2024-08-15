import express, {Request, Response } from 'express'
import { authenticate } from '../controllers/auth.controller';

const router = express.Router()

router.post('/', authenticate) 

export default router;