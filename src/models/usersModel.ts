// modelo de usuarios va lo de postman
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserInBd = async ({ name, email, password }: { name: string; email: string; password: string }): Promise<any> => {
    // Lógica para crear el usuario en la base de datos
    const user = await prisma.users.create({
        data: {
            name,
            email,
            password, 
        },
    });
    return user;
};

