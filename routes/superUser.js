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
            var status;

            if (req.body.status === 'Accept') {
                status = 'active';
                var mailOpts, smtpConfig;

                smtpConfig = nodemailer.createTransport('SMTP', {
                    service: 'Gmail',
                    auth: {
                        user: 'APP EMAIL',
                        pass: 'APP PASSWORD'
                    }
                });

                mailOpts = {
                    from: 'Findivity',
                    to: data.email,
                    subject: 'invite to join',
                    text: data.firstName 'your request to join Findivity was succesful. Please setup your password using the link. Note your email address will be used to login ' + 'http://hub.projectcodex.co/account/verifyaccount/' + data.token
                };

            } else if (req.body.status === 'Reject') {
                status = 'rejected';
            };
            const superUserDataService = services.superUserDataService;
            superUserDataService.handleRequest(status, id)
                .then(function(results) {
                    res.redirect('/root');
                })
                .catch(function(err) {
                    next(err);
                });
        });
};
