exports.signup = function (req, res)  {
  res.render('signup',{layout:false});
};

exports.login = function (req, res) {
  res.render('login',{layout:false});
};

exports.dashboard = function  (req, res)  {
  res.render('dashboard');
};

exports.questionnaire = function  (req, res)  {
  res.render('setup-questionnaire-step-1');
};

exports.logout = function(req, res) {
  delete req.session.user
  res.redirect("/");
};
