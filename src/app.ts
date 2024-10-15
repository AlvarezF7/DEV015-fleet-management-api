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

