exports.signup = function (req, res)  {
  res.render('signup',{layout:false});
};

exports.login = function (req, res) {
  res.render('login',{layout:false});
};

exports.dashboard = function  (req, res)  {
  res.render('dashboard',{user:req.session.user,
  entity:req.session.entity});
};

exports.questionnaire = function  (req, res)  {
  res.render('setup-questionnaire-step-1',{user:req.session.user,
  entity:req.session.entity});
};

exports.logout = function(req, res) {
  delete req.session.user
  res.redirect("/");
};
