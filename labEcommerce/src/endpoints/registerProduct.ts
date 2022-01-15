import express, { Express, Request, Response } from "express"
import cors from 'cors'
import connection from "../data/connection";

const app: Express = express();

app.use(express.json());
app.use(cors());

const registerProduct = async (req:Request, res: Response): Promise<void> => {
    try{
        const id = Date.now().toString()

        if (!req.body.name || !req.body.price || !req.body.imageUrl){
            throw new Error("Você deve passar um nome, um price e um imageUrl!")
        }

        await connection('labecommerce_products')
            .insert({id: `${id}`, name: `${req.body.name}`, price: req.body.price, image_url: `${req.body.imageUrl}`})

        res.status(200).send("Produto cadastrado com sucesso!")

    } catch (error: any){
        console.log(error)
        res.send(error.message || error.sqlMessage)
    }
}

export default registerProduct