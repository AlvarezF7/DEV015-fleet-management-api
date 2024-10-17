//el controlador debe manejar la logica de las solicitudes HTTP y obtener los datos 
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {findAllTrajectories, findTaxiById} from '../models/trajectoryModel';


const prisma = new PrismaClient();

export const getAllTrajectories = async (req: Request, res: Response): Promise<void> => {
    try {
       
        const { longitude, latitude, date, taxi_id,taxi } = req.query;
       
        //manejo de error de taxi_id
         if (taxi_id && isNaN(Number(taxi_id))) {
            res.status(400).json({ error: 'El taxi_id debe ser un número.' });
            return; // evitar que se siga ejecutando el codigo.
        }
         /* falta la logica para manejar el error en caso de q no conicida el taxi_id con lo q ingresa el usuario
         if (taxi_id) {
            const taxiIdNum = Number(taxi_id);
            const taxiExists = await findTaxiById(taxiIdNum);

            if (!taxiExists) {
                res.status(404).json({ error: 'No se encontró un taxi con ese ID.' })
                return ;
            }
        }*/
       
        //manejo formato fecha
        if (typeof date !== 'string' || !/^\d{2}-\d{2}-\d{4}$/.test(date)) {
            res.status(400).json({ error: 'El parámetro date debe estar en formato DD-MM-YYYY' });
            return;
        }
        const [day, month, year] = date.split('-'); // Divide la fecha
        const startDate = new Date(`${year}-${month}-${day}T00:00:00Z`); // Inicio del día
        const endDate = new Date(`${year}-${month}-${day}T23:59:59Z`);  
        const dates = date; /*esta es la q deja la fecha sin hora*/

        //verifica si la fecha es valida
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            res.status(400).json({ error: 'Error Fechas no validas' });
            return;
        }

        /* codigo anterios
        const startDate = Date ? newDate(`$(date)T00:00:00Z`):undefined;
        const endDate = Date ? newDate(`$(date)T00:00:00Z`):undefined;*/

        const trajectories = await findAllTrajectories({
            longitude,
            latitude,
            startDate,
            endDate,
            taxi_id
        });
     
        res.json(trajectories.map(({ id, date, taxi_id, longitude, latitude,taxi}) => ({
            id,
            plate:taxi.plate,
            date:dates, //date solito aparece la fecha en formato americano y con hora
            taxiId:taxi_id,
            longitude,
            latitude,
            
        })));
    } catch (error) {
        console.error(error);
        if (!res.headersSent){ //verifica q se enviaron los headers al cliente
        res.status(400).json({ error: 'Error al obtener los registros de trayectorias' });
      }
    }
};
