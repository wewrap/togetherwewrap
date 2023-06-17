import dotenv from 'dotenv'
dotenv.config()

const secretcode = process.env.SESSION_SECRET as string
const googleClientID = process.env.GOOGLE_CLIENT_ID as string
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string

const facebookClientID = process.env.FACEBOOK_CLIENT_ID as string
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET as string

const facebookCallBackURL = process.env.FACEBOOK_CALLBACK_URL as string
const googleCallBackURL = process.env.GOOGLE_CALLBACK_URL as string

const LOCAL_DB_USERNAME = process.env.LOCAL_DB_USERNAME
const LOCAL_DB_HOST = process.env.LOCAL_DB_HOST
const LOCAL_DB_DBNAME = process.env.LOCAL_DB_DBNAME
const LOCAL_DB_PASS = process.env.LOCAL_DB_PASS

const LOCAL_DATABASE_URL = `mysql://${LOCAL_DB_USERNAME}:${LOCAL_DB_PASS}@${LOCAL_DB_HOST}/${LOCAL_DB_DBNAME}`;

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

let port: number | string | undefined;
if (process.env.NODE_ENV === 'development') {
  port = 8000
  process.env.DATABASE_URL = LOCAL_DATABASE_URL
} else if (process.env.NODE_ENV === 'production') {
  port = process.env.PORT
}

export {
  secretcode, googleClientID,
  googleClientSecret, facebookAppSecret,
  facebookClientID, facebookCallBackURL,
  googleCallBackURL, port
}
