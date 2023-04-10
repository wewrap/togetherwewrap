import { EventType } from '@prisma/client'
import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    res.status(400).json({ error: result.array(), dataReceived: req.body.EventType, dataRequired: Object.values(EventType) })
  } else {
    next()
  }
}
