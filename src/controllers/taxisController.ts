//codigo de la consulta para los taxis
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GetTaxis } from '../models/taxiModel';

const prisma = new PrismaClient();

export const getAllTaxis = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const plate = req.query.plate as string; // Obtiene plate

        //manejo de error        
        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            res.status(400).json({ error: 'pagina o limite invalido' });
            return;
        }
       
       const taxis = await GetTaxis (page, limit, plate);
          
        // Manejo de error
        if (taxis.length === 0) {
            res.status(400).json({ error: 'Página no encontrada' });
            return;//sale de la fx sin retornar valor
        }
        res.json(taxis);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros de taxis' });
    }
};



