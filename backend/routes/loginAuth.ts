import express from "express";
const loginAuthRouter = express.Router()
import passport from 'passport'

loginAuthRouter.get('/', (req, res) => {
    res.status(400).send('failed login')
})

loginAuthRouter.get('/password',
    function (req, res, next) {
        res.render('login');
    });

loginAuthRouter.post('/password',
    passport.authenticate('local', { failureMessage: true }),
    function (req, res) {
        console.log(req.body)
        res.status(200).send("we logged in")
    });


export default loginAuthRouter