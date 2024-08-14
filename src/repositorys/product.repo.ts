import express, {Request, Response} from 'express';
import {prisma} from '../services/prisma'
import { Produto } from '@prisma/client';


export const getProduct = async () => {
    const products = await prisma.produto.findMany({
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
    return products
}

export const createProduct = async (produto: Produto) => {
       const newProduct = prisma.produto.create({
            data: produto
        })
        return newProduct

}

export const updateProduct = async (id: number, product: Produto) => {

    const user = await prisma.produto.update({
            where: {
                id: id
            },
            data: {
                ...product,
            }
    })
}

export const removeProduct = async (id: number) => {
   const removeProduct = await prisma.produto.delete({
    where:{
        id: id
    }
   })
}