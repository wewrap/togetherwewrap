import express from 'express'
const userDataRouter = express.Router()

userDataRouter.get('/', (req, res) => {
  if (req.user !== null) {
    res.send(req.user)
    return
  }

  res.status(400).send("User doesn't exist")
})

export default userDataRouter
