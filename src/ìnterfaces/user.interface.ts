export default interface IUser
{
    _id: string
    createdAt: string
    drink: IDrink
    email: string
    name: string
    shotNumber: number
    updatedAt: string
}

interface IDrink
{
    canReceived: boolean
    canSend: boolean
}