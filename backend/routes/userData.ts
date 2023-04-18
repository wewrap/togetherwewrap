import express from 'express'
const userDataRouter = express.Router()

userDataRouter.get('/:id', (req, res) => {
  if (req.user !== null && req.user !== undefined) {
    res.send(req.user)
    return
  }
  res.status(400).json({ error: "User doesn't exist" })
})

export default userDataRouter
