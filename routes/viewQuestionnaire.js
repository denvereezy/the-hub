var Promise = require('bluebird');

/////////////////////////////////////////////////////////////////
/////////////////// Setup Questionnaire ////////////////////////
////////////////////////////////////////////////////////////////

////setup-question-step-2
//exports.show = function (req, res, next) {
//
//    req.getServices()
//        .then(function(services){
//            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
//            setupQuestionnaireDataService.fetchEntityMetrics() //TODO temporarily hardcoding identity in SQL while without sign in / params in url
//                .then(function(metric){
//                    res.render('setup-questionnaire-step-2', {
//                        metric : metric
//                    });
//                });
//        })
//        .catch(function(err){
//            next(err);
//        });
//};