import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import passport from 'passport'
import googleOAuthRouter from './routes/googleOAuth'
import testRouter from './routes/testRoute'
import prisma from './utils/prismaClient'
import signUpAuth from './routes/signUpAuth'
import googleStrategy from 'passport-google-oauth20'
import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { PrismaClient } from '@prisma/client'
import { Strategy as LocalStrategy } from 'passport-local'
import crypto from 'crypto'
import { secretcode, googleClientID, googleClientSecret, facebookAppSecret, facebookClientID, facebookCallBackURL, googleCallBackURL } from './utils/config'
import facebookStrategy from 'passport-facebook'
import facebookOAuthRouter from './routes/facebookOAuth'
import loginAuthRouter from './routes/loginAuth'
import planRouter from './routes/plan'
import { checkUserAuthorization } from './modules/auth'
import userDataRouter from './routes/userData'
import contactCreatorRouter from './routes/contactCreator'
import logoutRouter from './routes/logout'
import inviteContactsRouter from './routes/inviteContactsRouter'
import verifyPlanInviteRouter from './routes/verifyPlanInvite'

const GoogleStrategy = googleStrategy.Strategy
const FacebookStrategy = facebookStrategy.Strategy
const app = express()

const db = prisma
const THREE_DAYS = 1000 * 60 * 60 * 24 * 3
const TWO_MINUTES = 1000 * 60 * 2

app.use(morgan('dev'))

app.use(cors({
  credentials: true,
  // origin property w/ localhost is required for local development
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(passport.initialize())

app.use(
  expressSession({
    cookie: {
      maxAge: THREE_DAYS
    },
    secret: secretcode,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: TWO_MINUTES,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined
      }
    )
  })
)

app.use(passport.session())

passport.serializeUser((user: any, done: any) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id
      }
    })
    return done(null, user)
  } catch (e) {
    console.error(e)
  }
})

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: googleCallBackURL
},
async function verify(accessToken: any, refreshToken: any, profile: any, done: any) {
  try {
    const user = await db.user.findFirst({
      where: {
        googleID: profile.id
      }
    })

    if (user === null) {
      const newUser = await db.user.create({
        data: {
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          googleID: profile.id,
          email: profile.emails[0].value
        }
      })
      done(null, newUser)
    } else {
      done(null, user)
    }
  } catch (error) {
    done(error, null)
  }
}))

passport.use(new FacebookStrategy({
  clientID: facebookClientID,
  clientSecret: facebookAppSecret,
  callbackURL: facebookCallBackURL,
  profileFields: ['id', 'displayName', 'email'],
  enableProof: true
}, async function verify(accessToken: any, refreshToken: any, profile: any, done: any) {
  try {
    const user = await db.user.findFirst({
      where: {
        facebookID: profile.id
      }
    })

    if (user === null) {
      const newUser = await db.user.create({
        data: {
          firstName: profile._json.name,
          lastName: profile._json.name,
          facebookID: profile._json.id,
          email: profile._json.email
        }
      })
      done(null, newUser)
    } else {
      done(null, user)
    }
  } catch (error) {
    done(error, null)
  }
}))

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: true

  },
  async function (req, email, password, done) {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })

    if ((user === null) || (user.salt === null)) {
      done(null, false)
      return
    }

    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256').toString('base64')
    if (user.password !== hashedPassword) {
      done(null, false)
    } else {
      done(null, user)
    }
  }
  ))

app.use('/', testRouter)
app.use('/verify-plan-invite', checkUserAuthorization, verifyPlanInviteRouter)
app.use('/auth/google', googleOAuthRouter)
app.use('/auth/facebook', facebookOAuthRouter)
app.use('/login', loginAuthRouter)
app.use('/api/plan', checkUserAuthorization, planRouter)
app.use('/signup', signUpAuth)
app.use('/api/contacts', checkUserAuthorization, contactCreatorRouter)
app.use('/userData', userDataRouter)
app.use('/logout', logoutRouter)
app.use('/api/inviteContacts', checkUserAuthorization, inviteContactsRouter)

export default app
