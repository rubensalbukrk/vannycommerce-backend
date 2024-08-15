import express, {Request, Response } from 'express'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
        res.json(req.body)
}) 

export default router;