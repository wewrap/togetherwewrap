import express from "express";
const testRouter = express.Router()
import prisma from '../utils/prismaClient'

testRouter.get('/feed', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    res.json(allUsers)
})

testRouter.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

testRouter.get('/api', (req, res) => {
    res.status(200).json({
        data: "Together we wrap!"
    })
})

export default testRouter