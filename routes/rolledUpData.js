exports.showResults = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            const rollupDataService = services.rollupDataService;
            rollupDataService.rollupMetrics()
                .then(function(values) {
                    res.render('questionnaire-results', {
                        values: values,
                        user: req.session.user,
                        entity: req.session.entity
                    });
                });
        })
        .catch(function(err) {
            next(err);
        });
};
