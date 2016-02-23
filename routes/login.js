const bcrypt = require('bcrypt');

exports.userCheck = function (req, res, next) {
        if (req.session.user){
             next();
        }
        else{
             res.redirect("/")
        }
};

exports.userLogin = function(req, res, next) {
    req.getServices()
    .then(function(services){
      const email = req.body.email;
      const loginDataService = services.loginDataService;
      loginDataService.login(email)
      .then(function(results){
          const user = results[0];
          bcrypt.compare(req.body.password, user.password,function(err, pass) {
              if (pass) {
                req.session.user = email;
                req.session.role =  user.role;
                req.session.entity_id = user.entity_id;
                return res.redirect("/dashboard")
              }
              else {
                return res.redirect('/');
              };
          });
      })
  })
    .catch(function(err){
      next(err);
    });
};
