import {prisma} from '../services/prisma'
import { User } from '@prisma/client';

type UserInput = Omit<User, 'id' | 'createAt' | 'updatedAt'>;

export const getUser = async () => {
    const Users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            address: true,
            city: true,
            phone: true,
            history: true
        }
    })
    return Users
}

export const createUser = async (user: UserInput) => {
       const newUser = prisma.user.create({
            data: user,
            select: {
                name: true,
                email: true,
                address: true,
                city: true,
                avatar: true,
                createAt: true,
                updatedAt: true
            }
        })
        return newUser

}

export const updateUser = async (id: number, user: User) => {

    const userUpdate = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...user,
            }
    })
}

export const removeUser = async (id: number) => {
   const removeUser = await prisma.user.delete({
    where:{
        id: id
    }
   })
}