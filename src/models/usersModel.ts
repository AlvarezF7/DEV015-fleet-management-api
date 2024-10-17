// modelo de usuarios va lo de postman
import { PrismaClient } from "@prisma/client";

const prisma =new PrismaClient ();

export const createUser = async ( userData: {name:string,email:string,password:string}) => {
    return await prisma.user.create({
     data:userData, 
    })
};