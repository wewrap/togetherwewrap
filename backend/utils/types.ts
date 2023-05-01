import { type User } from '@prisma/client'

export interface GeneralPlanData {
  description: string
  specialDate: Date
  specialPerson: User | undefined
  members: {
    planLeader: User | undefined
    acceptedMembers: User[]
    pendingMembers: User[]
    deniedMembers: User[]
  }
}
