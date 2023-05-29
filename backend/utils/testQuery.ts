// import { InviteStatus, Role } from '@prisma/client';
import prisma from './prismaClient';
const db = prisma

const main = async (): Promise<void> => {
  const responseData = await db.planInvite.findFirst({
    where: {
      planID: '1',
      inviteeEmail: 'kevinvong0129@gmail.com'
    }
  });
  if (responseData === null) return

  const today = new Date()
  const twoDayFromCreatedDate = new Date(today)
  twoDayFromCreatedDate.setDate(twoDayFromCreatedDate.getDate() + 2)

  const expired = responseData.expiration < twoDayFromCreatedDate

  console.log(expired)
}

void main();
