import express, {Request, Response} from 'express';
import { getProduct, createProduct, removeProduct, updateProduct } from '../repositorys/product.repo';
import {getFireProducts, createFireProduct, updateFireProduct, deleteFireProduct} from '../controllers/firebase/products.controller'


export const get = async (req: Request, res: Response) => {
    try {
        const allProducts = await getFireProducts();
        res.status(200).send({Products: allProducts})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const response = await createFireProduct(req.body)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const update = async(req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const productUpdate = req.body;
    try {
        const product = await updateFireProduct(productId, productUpdate, "")
        res.status(200).send(`O Produto ${productId} foi atualizado no estoque!`)
    } catch (error) {
        res.status(400).send(`Houve um problema na solicitação: ${error}`)
    }
 }


export const remove = async (req: Request, res: Response) => { 
    const productId = parseInt(req.params.id)
    try {
        const response = await deleteFireProduct(productId)
    res.status(200).send(`O Product ${productId} foi removido do estoque!`)
    } catch (error) {
        res.status(400).send(`Houve um problema na solicitação: ${error}`)
    }
}
