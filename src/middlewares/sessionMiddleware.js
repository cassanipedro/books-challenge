function sessionMiddleware(req, res, next){
    if(req.session.loggedUser){
        res.locals.user = req.session.loggedUser;
    } else res.locals.user = false;
  
    next();
 }
 module.exports = sessionMiddleware;