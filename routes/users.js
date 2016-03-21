exports.showUsers = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      const entity_id = req.session.entity_id;
      const user = req.session.user;
      const entity = req.session.entity;
      const userDataService = services.userDataService;
      userDataService.showEntityUsers(entity_id)
        .then(function(users) {
          res.render('users', {
            users: users,
            user:user,
            entity:entity
          })
        })
    })
    .catch(function(err) {
      next(err);
    });
};

exports.addUser = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      const data = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: 'password',
        entity_id: req.session.entity_id,
        role: 'admin',
        status: 'invited'
      };
      const signupDataService = services.signupDataService;
      signupDataService.addUser(data)
        .then(function(results) {
          res.redirect('/users');
        })
    })
    .catch(function(error) {
      next(error);
    });
};
