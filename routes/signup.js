var Promise = require('bluebird');

exports.add = function (req, res, next) {
    req.getServices()
      .then(function(services){
        const input = JSON.parse(JSON.stringify(req.body));
        const entity = {
            name  : input.name,
            logo  : input.logo,
            address : input.address
        };

        const user = {
            email :  input.email,
            role  :  'admin',
            status  : 'created',
            password  : 'password',
            firstName : input.firstName,
            lastName  : input.lastName
        };

        const signupDataService = services.signupDataService;
        signupDataService.addEntity(entity)
          .then(function(data){
          // console.log(data.insertId);
            user.entity_id = data.insertId;
            return signupDataService.addUser(user);
          })
            .then(function(user){
            })
              .then(function(results){
                  res.redirect('/');
              })
                .catch(function(err){
                  next(err);
                });
        });
};
