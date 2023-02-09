import { prisma } from "@prisma/client";
import express from "express";
const testRouter = express.Router()

testRouter.get('/feed', async (req, res) => {
    const allUsers = await prisma.User.findMany()
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