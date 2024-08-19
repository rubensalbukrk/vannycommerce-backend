import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response} from 'express'
import { Owner } from '../interfaces/owner'
import getLoginAuth from '../hooks/getLoginAuth'

export const authenticate = async (req: Request, res: Response, next: any) => {
    
   try {
    const {email, password} = req.body
    
    const user: Owner = await getLoginAuth(email, password);
    
    if(!bcrypt.compareSync(password, user.password)){
        res.status(400).send('Email ou Senha inválidos!')
        return;
    }

    if(user){
            const token = jwt.sign(
                {
                    id: user.id,
                    isAdmin: user.idAdmin,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    city: user.city,
                    avatar: user.avatar,
                    phone: user.phone,
                    history: user?.history
                },
                
                String(process.env.TOKEN_KEY),
                {
                    expiresIn: "3hr"
                }
            )
            next();
            const decodedUser = jwt.decode(token)
            res.status(200).send({token: token, user: decodedUser})
            
    }else {
        res.status(401).send(`Email ou Senha inválidos!`)
    }

   } catch (e) {
    res.status(400).send(e)
   }

}