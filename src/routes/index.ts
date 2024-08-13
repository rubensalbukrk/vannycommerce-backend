import express, {Router, Response, Request} from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import produtos from './produtos.routes'

export const app = express();


app.use(express.json())
app.use(cors())
dotenv.config();

app.get('/', (req, res) => {
    res.json({
        message: "Bem vindo, estamos no ar! 👋🌎"
    })
})

app.use('/produtos', produtos)

