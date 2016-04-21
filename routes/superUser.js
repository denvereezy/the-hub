exports.showRequests = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            const superUserDataService = services.superUserDataService;
            superUserDataService.showRequests()
                .then(function(requests) {
                    res.render('superUser', {
                        requests: requests,
                        user: req.session.user,
                        entity: req.session.entity,
                        layout:false
                    });
                })
        })
        .catch(function(err) {
            next(err);
        });
};

exports.rejectRequest = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var id = req.params.user_id;
            const superUserDataService = services.superUserDataService;
            superUserDataService.rejectRequest(id)
                .then(function(results) {
                    res.redirect('/root');
                })
                .catch(function(err) {
                    next(err);
                });
        });
};

exports.acceptRequest = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var id = req.params.user_id;
            const superUserDataService = services.superUserDataService;
            superUserDataService.acceptRequest(id)
                .then(function(results) {
                    res.redirect('/root');
                })
                .catch(function(err) {
                    next(err);
                });
        });
};
