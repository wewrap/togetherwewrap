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
      res.clearCookie('connect.sid')
      res.redirect('http://localhost:3000/login');
    });
  });
});

export default logoutRouter;
