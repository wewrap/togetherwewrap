import { type User } from '@prisma/client'

export interface GeneralPlanData {
  description: string
  specialDate: Date
  specialPerson: null | User
  members: {
    planLeader: null | User
    acceptedMembers: User[] | []
    pendingMembers: User[] | []
    deniedMembers: User[] | []
  }
}
