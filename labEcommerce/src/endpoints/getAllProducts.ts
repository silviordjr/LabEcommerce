import express, { Express, Request, Response } from "express"
import cors from 'cors'
import connection from "../data/connection";

const app: Express = express();

app.use(express.json());
app.use(cors());

const getAllProducts = async (req:Request, res: Response): Promise<void> => {
    try {
        const sort = req.query.sort === 'price' ? 'price' : 'name'
        const order = req.query.order === 'desc' ? 'desc' : 'asc'
        const search = req.query.search || '%'

        const products = await connection('labecommerce_products')
            .where('name', "LIKE" , `%${search}%`)
            .orderBy(`${sort}`, `${order}`)


        if (products.length === 0){
            throw new Error('Nenhum usuário encontrado!')
        }

        res.status(200).send(products)

    } catch(error: any) {
        console.log(error)
        res.send(error.message || error.sqlMessage)
    }
}

export default getAllProducts