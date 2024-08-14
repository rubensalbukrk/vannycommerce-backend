import express, {Router, Response, Request} from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import products from './products.routes'
import promotions from './promotion.routes'

export const app = express();

app.use(express.json())
app.use(cors())
dotenv.config();

app.get('/v1', (req, res) => {
    res.json({
        message: "Bem vindo, estamos no ar! 👋🌎"
    })
})

app.use('/v1/products', products)
app.use('/v1/promotions', promotions)
