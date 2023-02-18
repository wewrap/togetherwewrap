import express from 'express'
import prisma from '../utils/prismaClient'
const testRouter = express.Router()

testRouter.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

testRouter.get('/feed', async (req, res) => {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
  res.json(allUsers)
})

testRouter.get('/api', (req, res) => {
  res.status(200).json({
    data: 'Together we wrap!'
  })
})

export default testRouter
