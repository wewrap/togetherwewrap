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

export interface BrainstormIdeaPost {
  id: string
  firstName: string
  lastName: string
  description: string
  item: string
  itemLink: string
  authorId: string
  createdAt: Date
  updatedAt: Date
}
