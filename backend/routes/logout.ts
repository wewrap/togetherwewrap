import express from 'express';
import { redirectURL } from '../utils/config'

const logoutRouter = express.Router();

logoutRouter.post('/', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      next(err);
      return;
    }
    req.session.destroy(function (err) {
      if (err) {
        next(err);
        return;
      }
      const cookieName = 'connect.sid'
      res.clearCookie(cookieName)
      res.redirect(`${redirectURL}/login`);
    });
  });
});

export default logoutRouter;
