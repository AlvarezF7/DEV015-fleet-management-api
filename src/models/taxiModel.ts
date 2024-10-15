//aqui va el modelo Contienen la lógica para acceder a los datos. parece q los select tmb van aqui

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GetTaxis = async (page: number,limit: number, plate?: string) => {
    
     return await prisma.taxis.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: plate ? {
            plate: {
                startsWith: plate,   
                mode: 'insensitive',
            },
        } : undefined,
        select: {
            id: true,
            plate: true,
        },
    });
};
