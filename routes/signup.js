exports.add = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      var entity = {
        name: req.body.name,
        address: req.body.address,
        type: req.body.type
      };

      var user = {
        email: req.body.email,
        role: 'admin',
        status: 'created',
        password: 'password',
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };

      const signupDataService = services.signupDataService;
      signupDataService.addEntity(entity)
        .then(function(data) {
          user.entity_id = data.insertId;
          return signupDataService.addUser(user);
        })
        .then(function(results) {
          return res.redirect('/');
        })
        .catch(function(err) {
          next(err);
        });
    });
};
