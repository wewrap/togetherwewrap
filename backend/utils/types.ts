import { type Contact, type Plan, type User } from '@prisma/client'

export interface GeneralPlanData extends Plan {
  specialPerson: Contact | undefined
  members: {
    planLeader: User | undefined
    acceptedMembers: User[]
    pendingMembers: User[]
    deniedMembers: User[]
  }
}

export interface BrainstormIdeaPostOutput {
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
