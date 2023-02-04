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


// async function main() {
//   // ... you will write your Prisma Client queries here

//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })