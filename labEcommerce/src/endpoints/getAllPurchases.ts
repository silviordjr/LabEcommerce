import express, { Express, Request, Response } from "express"
import cors from 'cors'
import connection from "../data/connection";

const app: Express = express();

app.use(express.json());
app.use(cors());

const getAllPurchases = async (req:Request, res: Response): Promise<void> => {
    try {
        const purchases = await connection('labecommerce_purchases')

        if (purchases.length === 0){
            throw new Error('Nenhuma compra encontrada!')
        }

        res.status(200).send(purchases)


    } catch (error: any) {
        console.log(error)
        res.send(error.message || error.sqlMessage)
    }
}

export default getAllPurchases