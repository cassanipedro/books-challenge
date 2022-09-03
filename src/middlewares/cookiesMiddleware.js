const db = require('../database/models');
 
function sessionMiddleware(req, res, next){
   if(req.cookies.loggedUser && !req.session.loggedUser){
       res.locals.user = req.session.loggedUser;
       db.User.findOne({
           where:{
             Email: req.cookies.loggedUser
           }
         })
         .then(user => req.session.loggedUser = user)
   }
   next();
}
module.exports = sessionMiddleware;