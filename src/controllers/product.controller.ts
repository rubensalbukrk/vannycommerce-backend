import express, {Request, Response} from 'express';
import { getProduct, createProduct, removeProduct, updateProduct } from '../repositorys/product.repo';



export const get = async (req: Request, res: Response) => {
    try {
        const allProducts = await getProduct();
        res.status(200).send({Products: allProducts})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const response = await createProduct(req.body)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const update = async(req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const productUpdate = req.body;
    try {
        const product = await updateProduct(productId, productUpdate)
        res.status(200).send(`O Produto ${productId} foi atualizado no estoque!`)
    } catch (error) {
        res.status(400).send(`Houve um problema na solicitação: ${error}`)
    }
 }


export const remove = async (req: Request, res: Response) => { 
    const productId = parseInt(req.params.id)
    try {
        const response = await removeProduct(productId)
    res.status(200).send(`O Product ${productId} foi removido do estoque!`)
    } catch (error) {
        res.status(400).send(`Houve um problema na solicitação: ${error}`)
    }
}
