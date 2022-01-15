export type Purchase = [
    {
        "purchaseId": string,
        "product": string,
        "quantity": number,
        "total_price": number
    }
]

export type User = {
    "id": string,
    "name": string,
    "email": string,
    "password": string,
    "purchases": Purchase
}

export type UserInfo = {
    "id": string,
    "name": string,
    "email": string,
    "password": string
}