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
        res.redirect('/reset');
      }
      else{

        userDataService.update(data)
      }
    })
    .then(function(results){
      transporter.sendPaasswordReset(data);
      res.redirect('/')
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
    const userDataService = services.userDataService;

  })
}
