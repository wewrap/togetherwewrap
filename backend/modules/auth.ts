export const checkUserAuthorization = (req, res, next): void => {
  if (!req.user) {
    res.status(401).json({ error: 'not authorized' })
  } else {
    next()
  }
}
