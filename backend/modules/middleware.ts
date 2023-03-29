import { validationResult } from 'express-validator'

export const handleInputErrors = (req, res, next): void => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    res.json({ error: result.array() }).status(400)
  } else {
    next()
  }
}
