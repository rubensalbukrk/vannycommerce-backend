import express, {Request, Response} from 'express';
import {prisma} from '../services/prisma'
import { Produto } from '@prisma/client';

export const createProduto = async (produto: Produto) => {

       const newProduct = prisma.produto.create({
            data: produto
        })
        return newProduct

}

export const getProduto = async () => {
    const produtos = await prisma.produto.findMany({
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
    return produtos
}

export const removeProduto = async (id: number) => {
   const removeProduto = await prisma.produto.delete({
    where:{
        id: id
    }
   })
}