//setup-question-step-1
exports.create = function (req, res, next) {
    req.getServices()
        .then(function(services){
            const input = JSON.parse(JSON.stringify(req.body));
            const data = {
                entity_id : 1,  //TODO temporarily hardcoding identity while without sign in / params in url
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

//setup-question-step-2
exports.show = function (req, res, next) {
    req.getServices()
        .then(function(services){
            //const data = {
            //    entity_id : 1,  //TODO temporarily hardcoding identity while without sign in / params in url
            //}
            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
            setupQuestionnaireDataService.fetchEntityMetrics()
                .then(function(metric){
                    res.render('setup-questionnaire-step-2', {
                        metric : metric
                    });
                    });
                })
                .catch(function(err){
                    next(err);
                });
        };
