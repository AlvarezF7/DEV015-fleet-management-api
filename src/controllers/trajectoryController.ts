//el controlador debe manejar la logica de las solicitudes HTTP y obtener los datos 

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const getAllTrajectories = async (req: Request, res: Response): Promise<void> => {
    try {
       
        const { longitude, latitude, date, taxi_id } = req.query;
       
        const startDate = date ? new Date(`${date}T00:00:00Z`) : undefined; 
        const endDate = date ? new Date(`${date}T23:59:59Z`):undefined;

        const trajectories = await prisma.trajectories.findMany({
            where: {
                // Condiciones de búsqueda
                longitude: longitude ? Number(longitude) : undefined,
                latitude: latitude ? Number(latitude) : undefined,
                //date: date ? new Date(date as string) : undefined, 
                taxi_id: taxi_id ? Number(taxi_id) : undefined, //este fitro funciona

                date:{
                    gte: startDate,
                    lte:endDate,
                },
            },
            select: {
                id: true,       
                taxi_id: true,   
                longitude: true,
                latitude: true,
                date: true,     
            },
        });

      res.json({trajectories});
    } catch (error) {
        console.error(error);
        if (!res.headersSent){ //verifica q se enviaron los headers al cliente
        res.status(400).json({ error: 'Error al obtener los registros de trayectorias' });
      }
    }
};
