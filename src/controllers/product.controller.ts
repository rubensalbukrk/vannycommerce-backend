import express, {Request, Response} from 'express';
import {getFireProducts, createFireProduct, deleteFireProduct} from '../repositorys/firebase/products.repo'
import {MulterRequest} from '../interfaces/multerRequest'

export const get = async (req: Request, res: Response) => {
    try {
        const allProducts = await getFireProducts();
        res.status(200).send({Products: allProducts})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create =  async (req: Request, res: Response) => {
    try {
        // Converter 'req' para 'unknown' primeiro, e depois para 'MulterRequest'
        // evita que o TypeScript faça verificações estritas entre tipos incompatíveis
        const imageFile = (req as unknown as MulterRequest).file;
        const response = await createFireProduct(req.body, imageFile)

        res.status(200).send({message: `O produto foi criado com sucesso!`})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const remove = async (req: Request, res: Response) => { 
    const productId = parseInt(req.params.id)
    try {
        const response = await deleteFireProduct(productId)
        if (!response){
            throw new Error("Não foi possível completar a solicitação!");
        }
        res.status(200).send(`O Product ${productId} foi removido do estoque!`)
    } catch (error) {
        res.status(400).send(`${error}`)
    }
}
