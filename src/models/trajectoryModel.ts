/* by coach en los models van todo lo q tienen q ver con los .prisma */
/*
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getTrajectories = async (req: Request, res: Response): Promise<void> => {
     try {
        const { longitude, latitude, date, taxi_id, plate } = req.query;
        const trajectories = await prisma.trajectories.findMany({
    where: {
        // Condiciones de búsqueda
        longitude: longitude ? Number(longitude) : undefined,
        latitude: latitude ? Number(latitude) : undefined,
        plate: plate ? Number(plate): undefined,
        taxi_id: taxi_id ? Number(taxi_id) : undefined, //este fitro funciona

        date:{
            gte: startDate,
            lte: endDate,
        },
    },
    select: {
        id: true,   
        plate: true,  
        date: true,   
        taxi_id: true,   
        longitude: true,
        latitude: true,
            
    },
    }
)}}*/
     