export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  birthDate?: Date
  password?: string
}

export enum PlanStage {
  BRAINSTORM = 'BRAINSTORM',
  VOTING = 'VOTING',
  POOL = 'POOL',
  PURCHASE = 'PURCHASE',
  DELIVERY = 'DELIVERY',
  COMPLETED = 'COMPLETED',
}

export enum PlanStageView {
  HOME = 'HOME',
  BRAINSTORM = 'BRAINSTORM',
  VOTING = 'VOTING',
  POOL = 'POOL',
  PURCHASE = 'PURCHASE',
  DELIVERY = 'DELIVERY',
  COMPLETED = 'COMPLETED',
}
export interface Contact {
  firstName: string
  lastName?: string
  email: string
  phoneNumber?: string
  notes?: string
  ownerID: string
  id: string
}

export interface Plan {
  id: string
  description: string
  startDate: string
  specialEventType: any
  leaderId: string
  title: string
  createdAt: string
  updatedAt: string
}

export interface PlanCard {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  updatedAt?: Date
  createdAt?: Date
  contactID: string
  specialEventType?: string
  planLeader: User
}

export enum LoadStatus {
  LOADING = 'LOADING',
  NOT_LOADED = 'NOT_LOADED',
  LOADED = 'LOADED',
  FAILED = 'FAILED'
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
