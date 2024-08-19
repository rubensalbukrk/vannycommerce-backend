import express, {Request, Response} from 'express';
import { getUser, createUser, removeUser, updateUser } from '../repositorys/user.repo';
import { userValidation } from '../validations/user.validation';
import { createFireUser } from '../repositorys/firebase/user.repo';
import { MulterRequest } from '../interfaces/multerRequest';
import { User } from '@prisma/client';


export const get = async (req: Request, res: Response) => {
    try {
        const allUsers = await getUser();
        res.status(200).send({Users: allUsers})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const validatedUser = await userValidation.validate(req.body as User);

        const imageFile = (req as unknown as MulterRequest).file;

        
        const response = await createFireUser(validatedUser, imageFile)

        res.status(200).send('Um usuário foi criado!')
    } catch (error) {
        res.status(400).send(error)
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
