const nodemailer = require('nodemailer');
const uuid = require('node-uuid');

exports.showUsers = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      const entity_id = req.session.entity_id;
      const user = req.session.user;
      const entity = req.session.entity;
      const userDataService = services.userDataService;
      userDataService.showEntityUsers(entity_id, user)
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
        text: data.firstName + ' you have been invited by ' + req.session.entity + ' to become a user. Please follow the link to setup your password. Your current email address is used to login.' + 'https://hub.projectcodex.co/account/verifyaccount/' + data.token
      };

      smtpConfig.sendMail(mailOpts);

      const signupDataService = services.signupDataService;
      signupDataService.addUser(data)
        .then(function(results) {
          res.redirect('/users');
        })
    .catch(function(error) {
      next(error);
    });
  });
};

exports.confirmUser = function (req, res, next) {
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
      data.password = confirmPassword;
    }
    else{
      req.flash('alert', 'Passwords does not match, please try again');
      res.redirect('/account/verifyaccount/' + token)
    }

    const userDataService = services.userDataService;
    userDataService.confirmAccount(user, token)
    .then(function(results) {
      res.redirect('/');
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
          res.redirect('/users');
        })
    })
    .catch(function(error) {
      next(error);
    });
};
