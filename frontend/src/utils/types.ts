export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  birthDate?: Date
  password?: string
}

export enum PlanStage {
  UNINITIALIZED = 'UNINITIALIZED',
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
  startData: string
  specialEventType: any
  createdAt?: string
  updatedAt?: string
}

export enum LoadStatus {
  LOADING = 'LOADING',
  NOT_LOADED = 'NOT_LOADED',
  LOADED = 'LOADED',
  FAILED = 'FAILED'
}
