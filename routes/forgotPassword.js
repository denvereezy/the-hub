const uuid = require('node-uuid');
const SmtpMailService = require('../data_services/smtpDataService');


exports.forgotPassword = function(req, res, next) {
  req.getServices()
  .then(function(services){
    var email = req.body.email;
    const getUserInfo = services.loginDataService;
    var transporter = new SmtpMailService();
    const userDataService = services.userDataService;
    var data = {
      email: email,
      token: uuid.v4()
    };
    getUserInfo.login(email)
    .then(function(info){
      var user = info[0];
      console.log(user);
      if(user === undefined){
        req.flash('Email address entered is invalid, please try again');
        res.redirect('/forgot/password');
      }
      else{

        userDataService.update(data)
      }
    })
    .then(function(results){
      transporter.sendPaasswordReset(data);
      req.flash('message', 'A password reset email has been sent to ' + data.email + '. Please follow the instructions to reset your password.')
      res.redirect('/forgot/password')
    })
  })
  .catch(function(err){
    next(err);
  });
};

exports.updateUserAccount = function(req, res ,next) {
  req.getServices()
  .then(function(services){
    var token = req.params.token;
    var password = req.body.password;
    var password2 = req.body.password2;
    const userDataService = services.userDataService;
    if (password !== password2){
      req.flash('alert', 'Passwords does not match. Please try again');
      return res.redirect('/reset/' + token);
    }else{
      userDataService.updatePassword(password, token)
      .then(function(results) {
        res.redirect('/');
      })
    }
  })
  .catch(function(err) {
    next(err);
  });
};
