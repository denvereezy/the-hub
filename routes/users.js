exports.showUsers = function(req, res, next) {
  req.getServices()
    .then(function(connection) {
      const entity_id = req.session.entity_id;
      const userDataService = services.userDataService;
      userDataService.showEntityUsers(entity_id)
        .then(function(users) {
          res.render('users', {
            users: users
          })
        })
    })
    .catch(function(err) {
      next(err);
    });
};

exports.addUser = function(req, res, next) {
  req.getServices()
    .then(function(connection) {
      const data = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: 'password',
        entity_id: req.session.entity_id
      };
      const userDataService = services.userDataService;
      userDataService.addUserToEntity(data)
        .then(function(results) {
          res.redirect('/users');
        })
    })
    .catch(function(error) {
      next(error);
    });
};
