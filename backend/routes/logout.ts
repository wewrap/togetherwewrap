import express from "express";


const logoutRouter = express.Router();

logoutRouter.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      req.session.destroy(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('http://localhost:3000/login');
      });
    });
  });

  export default logoutRouter;
