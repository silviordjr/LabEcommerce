import express, { Express, Request, Response } from "express"
import cors from 'cors'
import connection from "../data/connection";

const app: Express = express();

app.use(express.json());
app.use(cors());

const getPurchasesFromUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const purchases = await connection('labecommerce_purchases')
            .join('labecommerce_products', 'labecommerce_purchases.product_id', '=', 'labecommerce_products.id')
            .select('labecommerce_purchases.id as purchaseId','labecommerce_products.name as product', 'labecommerce_purchases.quantity', 'labecommerce_purchases.total_price')
            .where('labecommerce_purchases.user_id', req.params.userId)

        if (purchases.length === 0){
            throw new Error('Nenhuma compra encontrada!')
        }

        res.status(200).send(purchases)


    } catch (error: any){
        console.log(error)
        res.send(error.message || error.sqlMessage)
    }
}

export default getPurchasesFromUser
