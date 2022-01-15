import express, { Express, Request, Response } from "express"
import cors from 'cors'
import connection from "../data/connection";

const app: Express = express();

app.use(express.json());
app.use(cors());

const registerPurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Date.now().toString() 

        const products = await connection('labecommerce_products').where('id', req.body.productId)

        const totalPrice = products[0].price * req.body.quantity

        if (!req.body.userId || !req.body.productId || !req.body.quantity){
            throw new Error("Você deve passar um userId, um productId e uma quantity!")
        }

        await connection('labecommerce_purchases')
            .insert({id: `${id}`, user_id: `${req.body.userId}`, product_id: `${req.body.productId}`, quantity: req.body.quantity, total_price: totalPrice})
        
        res.status(200).send("Venda cadastrada com sucesso!")

    } catch (error: any){
        console.log(error)
        res.send(error.message || error.sqlMessage)
    }
}

export default registerPurchase