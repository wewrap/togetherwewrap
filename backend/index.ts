import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, "../.env")});
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import morgan from 'morgan';

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient()

app.get('/feed', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    res.json(allUsers)
  })

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.get('/api', (req, res) => {
    res.status(200).json({
        data: "Together we wrap!"
    })
})

const port = 8000;

app.listen(8000, () => {
    console.log(`Server started: http://localhost:${port}/`);
}); 