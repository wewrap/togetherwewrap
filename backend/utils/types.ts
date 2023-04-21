import { type User } from '@prisma/client'

export interface GeneralPlanData {
  description: string
  specialDate: Date
  specialPerson: User | null
  members: {
    planLeader: User | null
    acceptedMembers: User[]
    pendingMembers: User[]
    deniedMembers: User[]
  }
}
