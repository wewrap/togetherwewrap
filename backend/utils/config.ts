
const secretcode = process.env.SESSION_SECRET as string
const googleClientID = process.env.GOOGLE_CLIENT_ID as string
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string

const facebookClientID = process.env.FACEBOOK_CLIENT_ID as string
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET as string

const facebookCallBackURL = process.env.FACEBOOK_CALLBACK_URL as string
const googleCallBackURL = process.env.GOOGLE_CALLBACK_URL as string

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

let envConfig: Record<string, unknown>;
if (process.env.NODE_ENV === 'development') {
  envConfig = {
    port: 3000
  }
} else if (process.env.NODE_ENV === 'production') {
  envConfig = {
    port: process.env.PORT
  }
}

export {
  secretcode, googleClientID,
  googleClientSecret, facebookAppSecret,
  facebookClientID, facebookCallBackURL,
  googleCallBackURL, envConfig
}
