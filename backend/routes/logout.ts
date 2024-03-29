import express from 'express';

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
      res.status(200).json({ message: 'Logged out' });
    });
  });
});

export default logoutRouter;
