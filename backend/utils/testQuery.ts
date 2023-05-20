/* eslint-disable @typescript-eslint/no-unused-vars */
// import { InviteStatus, Role } from '@prisma/client';
import { type PlanInvite } from '@prisma/client';
import prisma from './prismaClient';
const db = prisma

const main = async (): Promise<void> => {
  const params: PlanInviteModelInput = {
  }

  const planInvite = await readOnePlanInviteTwo(params)

  console.log(planInvite)
}

async function deleteMyInvite() {
  const res = await db.planMembership.deleteMany({
    where: {
      planID: '1'
    }
  })
}

async function readOnePlanInviteTwo(params: PlanInviteModelInput): Promise<PlanInvite | null> {
  const responseData = await db.planInvite.findFirst({
    where: {
      ...params
    }
  })

  if (responseData === null) throw new Error(`Unable to find a matching plan invite with in the database${JSON.stringify(params)}`)

  return responseData
}

export interface PlanInviteModelInput extends Partial<PlanInvite> {
}

void main();
