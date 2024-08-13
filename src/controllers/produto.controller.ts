import express, {Request, Response} from 'express';
import { getProduto, createProduto, removeProduto } from '../repositorys/produto.controller';



export const get = async (req: Request, res: Response) => {
    try {
        const allProdutos = await getProduto();
        res.status(200).send({produtos: allProdutos})
    } catch (error) {
        res.status(400).send(error)
    }
}


export const create = async (req: Request, res: Response) => {
    try {
        const response = await createProduto(req.body)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
}

