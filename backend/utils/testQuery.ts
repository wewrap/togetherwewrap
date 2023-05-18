// import { InviteStatus, Role } from '@prisma/client';
import prisma from './prismaClient';
const db = prisma

const main = async (): Promise<void> => {
  const res = await db.planMembership.deleteMany({
    where: {
      planID: '1'
    }
  })
}

void main();
