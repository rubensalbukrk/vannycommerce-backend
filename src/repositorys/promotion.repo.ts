import express, {Request, Response} from 'express';
import {prisma} from '../services/prisma'
import { Produto } from '@prisma/client';


export const getPromotion = async () => {
    const Promotions = await prisma.promotions.findMany({
        select: {
            id: true,
            title: true,
            estoque: true,
            descrition: true,
            descount: true,
            price: true,
            img: true
        }
    })
    return Promotions
}

export const createPromotion = async (produto: Produto) => {
       const newPromotion = prisma.promotions.create({
            data: produto
        })
        return newPromotion

}

export const removePromotion = async (id: number) => {
   const removePromotion = await prisma.promotions.delete({
    where:{
        id: id
    }
   })
}