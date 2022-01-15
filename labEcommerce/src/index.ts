import express, {Express} from 'express'
import cors from 'cors'
import getAllUsers from './endpoints/getAllUsers';
import createUser from './endpoints/createUser';
import registerProduct from './endpoints/registerProduct';
import getAllProducts from './endpoints/getAllProducts';
import registerPurchase from './endpoints/registerPurchase';
import getAllPurchases from './endpoints/getAllPurchases';
import getPurchasesFromUser from './endpoints/getPurchasesFromUser';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/users', getAllUsers)
app.post('/users', createUser)
app.get('/users/:userId/purchases', getPurchasesFromUser)

app.post('/products', registerProduct)
app.get('/products', getAllProducts)

app.post('/purchases', registerPurchase)
app.get('/purchases', getAllPurchases)


import { AddressInfo } from "net";






const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});