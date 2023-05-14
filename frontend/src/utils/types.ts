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
