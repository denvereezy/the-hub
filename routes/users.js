const nodemailer = require('nodemailer');
const uuid = require('node-uuid');

exports.showUsers = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            const entity_id = req.session.entity_id;
            const email = req.session.email;
            const user = req.session.user;
            const entity = req.session.entity;
            const userDataService = services.userDataService;
            userDataService.showEntityUsers(entity_id, email)
                .then(function(users) {
                    res.render('users', {
                        users: users,
                        user: user,
                        entity: entity
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
            var email = req.body.email;
            const checkEmailAvailablity = services.loginDataService;
            checkEmailAvailablity.login(email)
                .then(function(results) {
                    var user = results[0];
                    if (user !== undefined) {
                        req.flash('alert', 'Email entered is in use. Please try again');
                        res.redirect('/users');
                    } else {

                        const data = {
                            email: req.body.email,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            password: '',
                            entity_id: req.session.entity_id,
                            role: 'admin',
                            status: 'invited',
                            token: uuid.v4()
                        };

                        var mailOpts, smtpConfig;

                        smtpConfig = nodemailer.createTransport('SMTP', {
                            service: 'Gmail',
                            auth: {
                                user: 'APP EMAIL',
                                pass: 'APP PASSWORD'
                            }
                        });

                        mailOpts = {
                            from: req.session.entity,
                            to: data.email,
                            subject: 'invite to join',
                            text: data.firstName + ' you have been invited by ' + req.session.entity + ' to become a user. Please follow the link to setup your password. Your current email address is used to login.' + 'http://hub.projectcodex.co/account/verifyaccount/' + data.token
                        };

                        const signupDataService = services.signupDataService;
                        signupDataService.addUser(data)
                            .then(function(results) {
                                smtpConfig.sendMail(mailOpts);
                                req.flash('success', 'user added successfully');
                                res.redirect('/users');
                            })
                            .catch(function(error) {
                                next(error);
                            });
                    };
                });
        });
};

exports.confirmUser = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            const token = req.params.token;
            const password = req.body.password;
            const confirmPassword = req.body.password2;
            const user = {
                token: null,
                status: 'active'
            };

            if (confirmPassword === password) {
                user.password = confirmPassword;
            } else {
                req.flash('alert', 'Passwords does not match, please try again');
                res.redirect('/account/verifyaccount/' + token)
            }
            const userDataService = services.userDataService;
            userDataService.checkToken(token)
                .then(function(user) {
                    match = user[0];
                    if (token !== match) {
                        req.flash('alert', 'Token has expired, please try again');
                        res.redirect('/account/verifyaccount/' + token)
                    } else {
                        userDataService.confirmAccount(user, token)
                            .then(function(results) {
                                req.flash('success', 'Password reset was successful');
                                res.redirect('/');
                            })
                    };
                })
        })
        .catch(function(error) {
            next(error);
        });
};

exports.delete = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            const id = req.params.id;
            const userDataService = services.userDataService;
            userDataService.deleteUser(id)
                .then(function(results) {
                    req.flash('success', 'user removed successfully');
                    res.redirect('/users');
                })
        })
        .catch(function(error) {
            next(error);
        });
};
