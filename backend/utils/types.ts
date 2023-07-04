import { type PlanBrainstorm, type Contact, type Plan, type User, type PlanMembership } from '@prisma/client'

export interface GeneralPlanData extends Plan {
  specialPerson: Contact | undefined
  members: {
    planLeader: User | undefined
    acceptedMembers: User[]
    pendingMembers: User[]
    deniedMembers: User[]
  }
}

export interface BrainstormIdeaPostOutput extends PlanBrainstorm {
  id: string
  firstName: string
  lastName: string
  description: string
  item: string
  itemLink: string
  authorId: string
  createdAt: Date
  updatedAt: Date
  voteCount: number
  planMembership: PlanMembership
}
