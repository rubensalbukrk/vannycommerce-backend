import jwt from 'jsonwebtoken'
import { Request, Response} from 'express'
var db = require('../services/firebase')

const getUser = async (email: string, password: string) => {
  try {
    const usersRef = db.collection('users');
    const user = await usersRef
    .where('email', '==', email)
    .where('password', '==', password)
    .get();
    const thisUser = user.docs[0].data();

    return thisUser
  } catch (error) {
    console.error("Problema ao obter usuário, tente novamente!")
  }
};

export const authenticate = async (req: Request, res: Response, next: any) => {
    
   try {
    const {email, password} = req.body

    const user = await getUser(email, password);

    if(!(email && password)){
        res.status(400).send('Email ou Senha inválidos!')
    }

     //retirado bcrypt bcrypt.compareSync(password, user.password)
    if(user){
        const token = jwt.sign(
            {
                id: user?.id,
                isAdmin: user?.isAdmin,
                name: user.nome,
                email: user.email,
                address: user.address,
                city: user.city,
                phone: user.phone,
                history: user?.history
            },
            
            String(process.env.TOKEN_KEY),
            {
                expiresIn: "3hr"
            }
        )
        const decodedUser = jwt.decode(token)
        res.status(200).send({token: token, user: decodedUser})
        
    }else {
        res.status(401).send(`Email ou Senha inválidos!`)
    }

   } catch (e) {
    res.status(400).send(e)
   }

}