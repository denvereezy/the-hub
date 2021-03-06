exports.add = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var email = req.body.email;
            const checkEmailAvailablity = services.loginDataService;
            checkEmailAvailablity.login(email)
                .then(function(results) {
                    var user = results[0];
                    if (user !== undefined) {
                        req.flash('alert', 'Email entered is in use. Please try again');
                        res.redirect('/signup');
                    } else {
                        var entity = {
                            name: req.body.name,
                            address: req.body.address,
                            type: req.body.type
                        };

                        var user = {
                            email: req.body.email,
                            role: 'admin',
                            status: 'pending',
                            password: '',
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
                                // req.flash('success', 'Sign up was successful');
                                return res.redirect('/message');
                            })
                            .catch(function(err) {
                                next(err);
                            });
                    };
                });
        });
};
