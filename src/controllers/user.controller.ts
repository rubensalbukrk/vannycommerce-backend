import express, {Request, Response} from 'express';
import { getUser, createUser, removeUser, updateUser } from '../repositorys/user.repo';
import { userValidation } from '../validations/user.validation';

export const get = async (req: Request, res: Response) => {
    try {
        const allUsers = await getUser();
        res.status(200).send({Users: allUsers})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const validatedUser  = await userValidation.validate(req.body);

        const response = await createUser(validatedUser)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(`Objeto: ${error}`)
    }
}

export const update = async(req: Request, res: Response) => {
    const UserId = parseInt(req.params.id);
    const UserUpdate = req.body;
    try {
        const User = await updateUser(UserId, UserUpdate)
        res.status(200).send(`O Produto ${UserId} foi atualizado no estoque!`)
    } catch (error) {
        res.status(400).send(`Houve um problema na solicitação: ${error}`)
    }
 }


export const remove = async (req: Request, res: Response) => { 
    const UserId = parseInt(req.params.id)
    try {
        const response = await removeUser(UserId)
    res.status(200).send(`O User ${UserId} foi removido do estoque!`)
    } catch (error) {
        res.status(400).send(`Houve um problema na solicitação: ${error}`)
    }
}
