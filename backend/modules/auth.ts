import { type NextFunction, type Request, type Response } from 'express'

export const checkUserAuthorization = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user === null || req.user === undefined) {
    res.status(401).json({ error: 'Not Authorized' })
  } else {
    console.info('auth successfull')
    next()
  }
}
