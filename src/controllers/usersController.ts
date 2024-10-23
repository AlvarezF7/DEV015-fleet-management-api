import { Request, Response } from 'express';
import { createUserInBd} from '../models/usersModel';

//funcion de usuarios
export const createUser = async (req: Request, res: Response): Promise<any> => {
    const {  name, email, password } = req.body; //para extraer parametros del body
    try {
       const newUser = await createUserInBd({name, email,password});
       res.status(201).json(newUser);
        
} catch (error) {
    console.error("error al crear usuario: ",error);
    res.status(500).json({ error: 'Error en los parametros' });
  }
};

