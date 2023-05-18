// import { InviteStatus, Role } from '@prisma/client';
import prisma from './prismaClient';
const db = prisma

const main = async (): Promise<void> => {
  const res = await db.planInvite.deleteMany({
    where: {
      inviteeEmail: 'kevinvong0129@gmail.com',
      planID: '1'
    }
  })
}

void main();
