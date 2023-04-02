import express from 'express'
const userDataRouter = express.Router()

userDataRouter.get('/', (req, res) => {
  console.log('hitting user-data')
  console.log(req.user)
  if (req.user !== null && req.user !== undefined) {
    res.send(req.user)
    return
  }
  res.status(400).json({ error: "User doesn't exist" })
})

export default userDataRouter
