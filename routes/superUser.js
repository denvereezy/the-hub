const nodemailer = require('nodemailer');
const uuid = require('node-uuid');
const SmtpMailService = require('../data_services/smtpDataService');
exports.showRequests = function(req, res, next) {
    req.getServices()
        .then(function(services) {
          var msg;
            const superUserDataService = services.superUserDataService;
            superUserDataService.showRequests()
                .then(function(requests) {
                  if(requests.length === 0){
                     msg = 'No new requests at this moment'
                  }
                    res.render('superUser', {
                        requests: requests,
                        msg:msg,
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
              var  to   = req.params.email,
              subject = 'Request to join',
              name = req.params.firstname;
              var mail;

            var transporter = new SmtpMailService();


            if (req.body.status === 'Accept') {
                data.status = 'active';
                 mail = {
                    to: to,
                    subject: subject,
                    text: name + ' your request to join Findivity was succesful. Please setup your password using the link. Note your email address will be used to login ' + 'http://findivity.com/account/verifyaccount/' + data.token
                };

            } else if (req.body.status === 'Reject') {
                data.status = 'rejected';
                 mail = {
                    to: to,
                    subject: subject,
                    text: name + ' your request to join Findivity was unsuccesful.'
                };
            };
            const superUserDataService = services.superUserDataService;
            superUserDataService.handleRequest(data, id)
                .then(function(results) {
                    transporter.send(mail);
                    req.flash('alert', 'account has been updated');
                    res.redirect('/root');
                })
                .catch(function(err) {
                    next(err);
                });
        });
};
