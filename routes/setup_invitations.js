const Promise = require('bluebird');

exports.show = function (req, res, next) {
    req.getServices()
        .then(function(services){
            const questionDataService = services.questionDataService;
            Promise.join(questionDataService.questions() , questionDataService.maxId(),
                function(questions,questionnaire){
                    res.render( 'setup-questionnaire-step-3', {
                        questions : questions,
                        questionnaire  : questionnaire
                    });
                })
                .catch(function(err){
                    next(err);
                });
        });
};