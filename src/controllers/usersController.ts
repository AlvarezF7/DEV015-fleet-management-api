import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();


//funcion de usuarios
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { id, name, email, password } = req.body;
    try {
       const newUser = await createUser({name, email,password});
       res.status(201).json(newUser);
        
} catch (error) {
    console.error("error al crear usuario: ",error);

    res.status(500).json({ error: 'Error en los parametros' });
  }
};
