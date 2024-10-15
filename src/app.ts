//paaqui va lo que inica el server y sus importaciones
import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';  //importa prisma para interactuar con BBDD
import taxiRoutes from './routes/taxis';
import trajectoryRoutes from './routes/trajectories';

const app: Application = express();
const prisma = new PrismaClient();
const PORT: number = 5000;

app.use(express.json());  // para que el servidor entienda las solicitud de datos en formato JSON (parsea al jsonbody y permite escucharlo como objeto)

//usar las rutas de ambas tablas
app.use('/taxis', taxiRoutes);
app.use('/trajectories', trajectoryRoutes);


app.listen(PORT, (): void => { // esto inica el servidor siempre al ultimo
    console.log('SERVER IS UP ON PORT:', PORT);
});

/*app.get('/', async(req: Request, res: Response): Promise<void> => { //creo q esta es la que obtiene todos los taxis
    const taxis = await prisma.taxis.findMany()
    res.json(taxis);
});

//se crea las rutas de taxis y se indica que debe devolver

app.get('/taxis', async (req: Request, res: Response): Promise<void> => { 
    try {
        //agrega una linea para manejar que el error en caso de que ingresen una letra en vez de un numero.
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
});*/