exports.signup = function (req, res)  {
  res.render('signup',{layout:false});
};

exports.login = function (req, res) {
  res.render('login',{layout:false});
};

exports.dashboard = function  (req, res)  {
  var donor = req.session.type === 'Donor';
  var facilitator = req.session.type === 'Facilitator';
  var startup = req.session.type === 'Startup';
  res.render('dashboard',{user:req.session.user,
  entity:req.session.entity, donor:donor, facilitator:facilitator, startup:startup});
};

exports.questionnaire = function  (req, res)  {
  res.render('setup-questionnaire-step-1',{user:req.session.user,
  entity:req.session.entity});
};

exports.logout = function(req, res) {
  delete req.session.user
  res.redirect("/");
};
