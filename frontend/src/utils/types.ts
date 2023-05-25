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

export enum PlanStageView {
  HOME = 'HOME',
  BRAINSTORM = 'BRAINSTORM',
  VOTING = 'VOTING',
  POOL = 'POOL',
  PURCHASE = 'PURCHASE',
  DELIVERY = 'DELIVERY',
  COMPLETED = 'COMPLETED',
}
