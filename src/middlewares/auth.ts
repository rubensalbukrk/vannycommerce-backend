import jwt from 'jsonwebtoken'
import express, {Request, Response} from 'express'

export const verifyToken = async (req: Request, res: Response, next: any) => {
    try {
        const token = <string | any>req.headers.authorization;
        if (!token){
            res.status(401).send('Token obrigatório!')
            return;
        }
        const replace = token.replace("Bearer ", "")
        jwt.verify(replace, String(process.env.TOKEN_KEY))
        next()
    } catch (e) {
        res.status(401).send({ message: 'Credenciais inválidas!'})
    }
}