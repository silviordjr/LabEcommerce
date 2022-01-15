import express, { Express, Request, Response } from "express"
import cors from 'cors'
import connection from "../data/connection";
import { Purchase, User, UserInfo } from "../types/types";

const app: Express = express();

app.use(express.json());
app.use(cors());

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await connection('labecommerce_users')

        const purchases = await connection('labecommerce_purchases')
            .join('labecommerce_products', 'labecommerce_purchases.product_id', '=', 'labecommerce_products.id')
            .join('labecommerce_users', 'labecommerce_users.id', '=', 'labecommerce_purchases.user_id')
            .select('labecommerce_users.id as user_id','labecommerce_purchases.id as purchaseId','labecommerce_products.name as product', 'labecommerce_purchases.quantity', 'labecommerce_purchases.total_price')
        

        if (users.length === 0){
            throw new Error('Nenhum usuário encontrado!')
        }

        const usersReturn = []

        for (let user of users){
            let userPurchases = []
            for (let purchase of purchases){

                if (purchase.user_id === user.id){
                    userPurchases.push(purchase)
                }
            }
            const userInfos = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "password": user.password,
                "purchases": userPurchases
            }

            usersReturn.push(userInfos)
        }

        res.status(200).send(usersReturn)

    } catch (error: any) {
        console.log(error)
        res.send(error.message || error.sqlMessage)
    }
}


export default getAllUsers