const bcrypt = require('bcrypt');

exports.userCheck = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/")
  }
};

exports.userLogin = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      var email = req.body.email;
      const loginDataService = services.loginDataService;
      loginDataService.login(email)
        .then(function(results) {
          var user = results[0];
          if (user === undefined) {
            return res.render("login", {
              message: "Email entered is Invalid, please try again",
              layout: false
            })
          };

          bcrypt.compare(req.body.password, user.password, function(err, pass) {
            if (pass) {
              req.session.user = user.firstName;
              req.session.role = user.role;
              req.session.entity_id = user.entity_id;
              req.session.entity = user.name;
              req.session.type = user.type;
              return res.redirect("/dashboard")
            } else {
              return res.render("login", {
                message: "Password entered is Invalid, please try again",
                layout: false
              })
            };
          });
        })
    })
    .catch(function(err) {
      next(err);
    });
};
