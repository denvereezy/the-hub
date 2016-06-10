const bcrypt = require('bcrypt');

exports.userCheck = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/")
    }
};

exports.checkSuperUser = function(req, res, next) {
    if (req.session.role === 'Super User') {
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
                    console.log(user);
                    if (user === undefined) {
                        req.flash('alert', 'Email or Password entered is Invalid, please try again 1');
                        return res.redirect("/");
                    } else if (user.status === 'invited') {
                        req.flash('alert', 'Email or Password entered is Invalid, please try again 2');
                        return res.redirect("/");
                    } else if (user.status === 'rejected') {
                        req.flash('alert', 'Email or Password entered is Invalid, please try again 3');
                        return res.redirect("/");
                    } else if (user.role === 'Super User') {
                        bcrypt.compare(req.body.password, user.password, function(err, pass) {

                            if (pass) {
                                req.session.user = user.firstName;
                                req.session.email = user.email;
                                req.session.role = user.role;
                                req.session.entity_id = user.entity_id;
                                req.session.entity = user.name;
                                req.session.type = user.type;
                                return res.redirect("/root")
                            };
                        });
                    } else {

                        bcrypt.compare(req.body.password, user.password, function(err, pass) {

                            if (pass) {
                                req.session.user = user.firstName;
                                req.session.email = user.email;
                                req.session.role = user.role;
                                req.session.entity_id = user.entity_id;
                                req.session.entity = user.name;
                                req.session.type = user.type;
                                return res.redirect("/dashboard")
                            } else {
                                req.flash('alert', 'Email or Password entered is Invalid, please try again');
                                return res.redirect("/")
                            };
                        });
                    };
                })
        })
        .catch(function(err) {
            next(err);
        });
};
