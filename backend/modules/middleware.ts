import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    res.status(400).json({ error: result.array() })
  } else {
    next()
  }
}
