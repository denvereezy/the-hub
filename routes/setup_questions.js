const Promise = require('bluebird');

exports.show = function (req, res, next) {
  req.getServices()
  .then(function(services){
    const questionDataService = services.questionDataService;
    Promise.join(questionDataService.questions() , questionDataService.maxId(),
    function(questions,questionnaire){
      res.render( 'setup-questionnaire-step-2', {
        questions : questions,
        questionnaire  : questionnaire
      });
    })
    .catch(function(err){
      next(err);
    });
  });
};

exports.add = function (req, res, next) {
    req.getServices()
      .then(function(services){
        const input = JSON.parse(JSON.stringify(req.body));
        const data = {
            question_description : input.question_description,
            questionnaire_id  : input.questionnaire_id
        };
        const questionDataService = services.questionDataService;
        questionDataService.addQuestion(data)
          .then(function(results){
              res.redirect('/setup-questionnaire-step-2/show');
          })
            .catch(function(err){
                next(err);
    });
});
};


exports.next = function (req, res, next) {
    req.getServices()
        .then(function(){
                    res.redirect('/setup-questionnaire-step-3/show');
                })
                .catch(function(err){
                    next(err);
                });
};