const nodemailer = require('nodemailer');
const Promise = require('bluebird');
module.exports = function() {
    var smtpConfig = {
        host: process.env.host,
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.password
        }
    };

    var poolConfig = {
        pool: true,
        host: process.env.host,
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.password
        }
    };

    var directConfig = {
        name: 'findivity.com'
    };

    this.send = function(mail) {

        var transporter = nodemailer.createTransport(smtpConfig, poolConfig, directConfig);
        var mailOptions = {
            from: '"Findivity" <admin@findivity.com>',
            to: [mail.to, 'findivityapp@gmail.com'],
            subject: mail.subject,
            text: mail.text
        };


        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
                return error;
            } else {
              console.log('Message sent: ' + info.response);
                return 'Message sent: ' + info.response;
            };
        });
    };

    this.sendPaasswordReset = function(data) {

        var transporter = nodemailer.createTransport(smtpConfig, poolConfig, directConfig);
        var mailOptions = {
            from: '"Findivity" <admin@findivity.com>',
            to: [data.email, 'findivityapp@gmail.com'],
            subject: 'Password reset',
            text: 'Please follow the link to reset your password. http://findivity.com/reset/' + data.token
        };


        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
                return error;
            } else {
              console.log('Message sent: ' + info.response);
                return 'Message sent: ' + info.response;
            };
        });
    };
};
