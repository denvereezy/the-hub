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
            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
            setupQuestionnaireDataService.fetchEntityMetrics() //TODO temporarily hardcoding identity in SQL while without sign in / params in url
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


exports.addMetricToMetricTable = function (req, res, next) {
    req.getServices()
        .then(function(services){
            const input = JSON.parse(JSON.stringify(req.body));
            const data = {
                title : input.title,
                description : input.description,
                entity_id : 1
            };
            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
            setupQuestionnaireDataService.addMetricToMetricTable(data)
                .then(function(results){
                    res.redirect('/setup-questionnaire-step-2/show');
                });
        })
        .catch(function(err){
            next(err);
        });
};

exports.linkMetricToQuestionnaire = function (req, res, next) {
    req.getServices()
        .then(function(services){
            const input = JSON.parse(JSON.stringify(req.body));
            const data = {
                title : input.title,
                description : input.description,
                entity_id : 1
            };
            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
            setupQuestionnaireDataService.addMetricToMetricTable(data)
                .then(function(results){
                    res.redirect('/setup-questionnaire-step-2/show');
                });
        })
        .catch(function(err){
            next(err);
        });
};