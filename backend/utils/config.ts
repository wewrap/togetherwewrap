
const secretcode = process.env.SESSION_SECRET as string;
const googleClientID = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

const facebookClientID = process.env.FACEBOOK_CLIENT_ID as string;
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET as string;

const facebookCallBackURL = process.env.FACEBOOK_CALLBACK_URL as string;
const googleCallBackURL = process.env.GOOGLE_CALLBACK_URL as string;

export {
    secretcode, googleClientID,
    googleClientSecret, facebookAppSecret,
    facebookClientID, facebookCallBackURL,
    googleCallBackURL
}


