import { InviteStatus, Role } from '@prisma/client';
import prisma from './prismaClient';
const db = prisma

const main = async (): Promise<void> => {
  const planMembers = await db.planMembership.findMany({
    where: {
      planID: 'e11be841-c85e-4fd4-911e-d8f58cdaa4cf'
    },
    include: {
      user: true
    }
  })

  const planMembersObject: any = {
    specialPerson: {},
    members: {
      planLeader: {},
      acceptedMembers: [],
      pendingMembers: [],
      deniedMembers: []
    }
  }

  for (const member of planMembers) {
    if (member.role === Role.SPECIAL_PERSON) planMembersObject.specialPerson = member.user
    else if (member.role === Role.PLAN_LEADER) planMembersObject.members.planLeader = member.user
    else if (member.role === Role.FRIEND) {
      switch (member.inviteStatus) {
        case InviteStatus.DENY:
          planMembersObject.members.deniedMembers.push(member.user)
          break;
        case InviteStatus.ACCEPTED:
          console.log('accepted: ', member.user);
          planMembersObject.members.acceptedMembers.push(member.user)
          break;
        case InviteStatus.INVITED:
          planMembersObject.members.pendingMembers.push(member.user)
          break;
      }
    }
  }

  console.log(planMembersObject);
}

void main();
