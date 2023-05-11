import express from 'express';

const logoutRouter = express.Router();

logoutRouter.post('/logout', function (req, res, next) {
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
      res.redirect('http://localhost:3000/tempLandingPage');
    });
  });
});

export default logoutRouter;
