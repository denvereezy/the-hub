exports.create = function (req, res, next) {
    req.getServices()
        .then(function(services){
            const input = JSON.parse(JSON.stringify(req.body));
            const data = {
                entity_id : 1,
                name : input.name,
                dueDate : input.dueDate
            };
            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
            setupQuestionnaireDataService.create(data)
                .then(function(results){
                    res.redirect('/setup-questionnaire-step-2/show');
                    });
                })
                .catch(function(err){
                    next(err);
                });
        };
