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



// Configure Strategy for Login

// user is prompted to sign in with their username and password by rendering a form
// defining a route

app.get('/login/password',
  function(req, res, next) {
    res.render('login');
  });

app.post('/login/password',
//   passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    console.log(req.body)
    res.status(200).send("we logged in")
  });

// var passport = require('passport');
// var LocalStrategy = require('passport-local');
// var crypto = require('crypto');
// var mysql = require('mysql12')

// // connecting to the database
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Workfahad6!',
//     database: 'mydatabase'
//   });
  
// checking for user info in the database
// passport.use(new LocalStrategy(function verify(username:any, password:any, cb:any) {
//     connection.query('SELECT * FROM users WHERE username = ?', [ username ], function(err:any, user:any) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
//       crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err:any, hashedPassword:any) {
//         if (err) { return cb(err); }
//         if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//           return cb(null, false, { message: 'Incorrect username or password.' });
//         }
//         return cb(null, user);
//       });
//     });
//   }));
//   connection.end()


  // HTTP POST endpoint for the route '/login. redirects user to the route specified if auth fails or is successful
//   app.post('/login/password',
// //   passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
//   function(req, res) {
//     console.log(req.body)
//     res.redirect('/~');
//   });