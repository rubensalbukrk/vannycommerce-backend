import { Produto, User } from "@prisma/client"

export interface Owner extends User {
    idAdmin?: Boolean
    history: Array<Omit<Produto, 'estoque' | 'updatedAt' | 'descrition'>>
}