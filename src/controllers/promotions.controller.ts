import express, {Request, Response} from 'express';
import { getPromotion, createPromotion, removePromotion, updatePromotion } from '../repositorys/promotion.repo';


export const get = async (req: Request, res: Response) => {
    try {
        const allPromotions = await getPromotion();
        res.status(200).send({Promotions: allPromotions})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const response = await createPromotion(req.body)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const update = async(req: Request, res: Response) => {
    const PromotionId = parseInt(req.params.id);
    const PromotionUpdate = req.body;
    try {
        const Promotion = await updatePromotion(PromotionId, PromotionUpdate)
        res.status(200).send(`A promoção ${PromotionId} foi atualizado no estoque!`)
    } catch (error) {
        res.status(400).send(`Houve um problema na solicitação: ${error}`)
    }
 }


export const remove = async (req: Request, res: Response) => { 
    const PromotionId = parseInt(req.params.id)
    try {
        const response = await removePromotion(PromotionId)
    res.status(200).send(`A promoção ${PromotionId} foi removido do estoque!`)
    } catch (error) {
        res.status(400).send(`Houve um problema na solicitação: ${error}`)
    }
}
