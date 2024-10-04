//aqui se desarrolla la api y se escribe el codigo 
import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';  //importa prisma para interactuar con BBDD


const app: Application = express();
const prisma = new PrismaClient();
const PORT: number = 3001;

app.use(express.json());  // para que el servidor entienda las solicitudes de datos en formato JSON

app.get('/', async(req: Request, res: Response): Promise<void> => { //creo q esta es la que obtiene todos los taxis
    const taxis = await prisma.taxis.findMany()
    res.json(taxis);
});

//se crea las rutas de taxis y se indica que debe devolver

app.get('/taxis', async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const plate = req.query.plate as string; // Obtiene plate

        const taxis = await prisma.taxis.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: plate ? {
                plate:{
                    startsWith: plate,   
                    mode: 'insensitive',
                },
            }:undefined,
            select:{
                id: true,
                plate:true,
            },
        });
        res.json(taxis);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});

//app.get (`/trajectories`, getTrajectories);

app.listen(PORT, (): void => { // esto inica el servidor siempre al ultimo
    console.log('SERVER IS UP ON PORT:', PORT);
});