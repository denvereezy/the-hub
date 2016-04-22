exports.signup = function(req, res) {
    res.render('signup', {
        layout: false
    });
};

exports.login = function(req, res) {
    res.render('login', {
        layout: false
    });
};

exports.questionnaire = function(req, res) {
    res.render('setup-questionnaire-step-1', {
        user: req.session.user,
        entity: req.session.entity
    });
};

exports.logout = function(req, res) {
    delete req.session.user
    res.redirect("/");
};

exports.verifyaccount = function(req, res) {
    res.render('verifyaccount', {
        user: req.session.user,
        entity: req.session.entity,
        layout: false,
        token: req.params.token
    });
};

exports.message = function(req, res) {
    res.render('message', {
      layout: false
    });
};
