/* eslint-disable @typescript-eslint/no-unused-vars */
// import { InviteStatus, Role } from '@prisma/client';
import { type PlanInvite } from '@prisma/client';
import prisma from './prismaClient';
const db = prisma

const main = async (): Promise<void> => {
  await db.planInvite.delete({
    where: {
      id: '4855ddd4-ef2b-4f87-8f19-206a7c308211'
    }
  })
}
void main();
