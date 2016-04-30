const nodemailer = require('nodemailer');
const uuid = require('node-uuid');

exports.showRequests = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            const superUserDataService = services.superUserDataService;
            superUserDataService.showRequests()
                .then(function(requests) {
                    res.render('superUser', {
                        requests: requests,
                        user: req.session.user,
                        entity: req.session.entity,
                        layout: false
                    });
                })
        })
        .catch(function(err) {
            next(err);
        });
};

exports.handleRequest = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var id = req.params.user_id;
            var data = {
              status: '',
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
            if (req.body.status === 'Accept') {
                data.status = 'active';
                mailOpts = {
                    from: 'Findivity',
                    to: req.params.email,
                    subject: 'Request to join',
                    text: req.params.firstname + ' your request to join Findivity was succesful. Please setup your password using the link. Note your email address will be used to login ' + 'http://hub.projectcodex.co/account/verifyaccount/' + data.token
                };

            } else if (req.body.status === 'Reject') {
                data.status = 'rejected';
                mailOpts = {
                    from: 'Findivity',
                    to: req.params.email,
                    subject: 'Request to join',
                    text: req.params.firstname + ' your request to join Findivity was unsuccesful.'
                };
            };
            const superUserDataService = services.superUserDataService;
            superUserDataService.handleRequest(data, id)
                .then(function(results) {
                    smtpConfig.sendMail(mailOpts);
                    req.flas('alert', 'account has been updated');
                    res.redirect('/root');
                })
                .catch(function(err) {
                    next(err);
                });
        });
};
