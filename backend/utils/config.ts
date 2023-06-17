import dotenv from 'dotenv'
dotenv.config()

const secretcode = process.env.SESSION_SECRET as string
const googleClientID = process.env.GOOGLE_CLIENT_ID as string
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string

const facebookClientID = process.env.FACEBOOK_CLIENT_ID as string
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET as string

let facebookCallBackURL = process.env.FACEBOOK_CALLBACK_URL as string
let googleCallBackURL = process.env.GOOGLE_CALLBACK_URL as string

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

let port: number | string | undefined;
let redirectURL: string | undefined;
if (process.env.NODE_ENV === 'development') {
  port = 8000
  redirectURL = 'http://localhost:8000'
} else if (process.env.NODE_ENV === 'production') {
  port = process.env.PORT
  facebookCallBackURL = 'https://www.wewrap.app/auth/facebook/callback'
  googleCallBackURL = 'https://www.wewrap.app/auth/google/callback'
  redirectURL = ''
}

export {
  secretcode, googleClientID,
  googleClientSecret, facebookAppSecret,
  facebookClientID, facebookCallBackURL,
  googleCallBackURL, port, redirectURL
}
