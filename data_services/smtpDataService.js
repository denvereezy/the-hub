const nodemailer = require('nodemailer');

module.exports = function() {
    this.sendMail = function(mailOpts) {
      var nodemailer = require('nodemailer');

      var smtpConfig = {
          host: 'halicarnassus.aserv.co.za',
          port: 465,
          secure: true, // use SSL
          auth: {
              user: 'admin@findivity.com',
              pass: 'GB1$iPTzQw+R'
          }
      };

      var poolConfig = {
          pool: true,
          host: 'halicarnassus.aserv.co.za',
          port: 465,
          secure: true, // use SSL
          auth: {
              user: 'admin@findivity.com',
              pass: 'GB1$iPTzQw+R'
          }
      };

      var directConfig = {
          name: 'findivity.com' // must be the same that can be reverse resolved by DNS for your IP
      };

      var transporter = nodemailer.createTransport(smtpConfig,poolConfig,directConfig)
      return transporter;
      // create reusable transporter object using the default SMTP transport

      // setup e-mail data with unicode symbols
      var mailOptions = {
          from: '"Fred Foo 👥" <admin@findivity.com>', // sender address
          to: 'denver@projectcodex.co, denver@projectcodex.co', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world 🐴', // plaintext body
          html: '<b>Hello world 🐴</b>' // html body
      };

      // send mail with defined transport object
      nodemailer.sendMail(mailOpts,{
          transport : transporter //pass your transport

        })
    };
};
