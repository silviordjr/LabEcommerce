import express, { Express, Request, Response } from "express"
import cors from 'cors'
import connection from "../data/connection";

const app: Express = express();

app.use(express.json());
app.use(cors());

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Date.now().toString()
        await connection('labecommerce_users')
            .insert({id: `${id}`, name: `${req.body.name}`, email: `${req.body.email}`, password: `${req.body.password}` })
        
        if (!req.body.name || !req.body.email || !req.body.password){
            throw new Error("Você deve passar um nome, um email e uma senha!")
        }

        res.status(200).send("Usuário cadastrado com sucesso!")

    } catch (error: any){
        console.log(error)
        res.send(error.message || error.sqlMessage)
    }
}

export default createUser