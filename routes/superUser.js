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
