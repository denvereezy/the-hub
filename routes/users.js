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
