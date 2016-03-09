const Promise = require('bluebird');

exports.show = function (req, res, next) {
   req.getServices()
       .then(function(services){
           const viewQuestionnnaireDataService = services.viewQuestionnnaireDataService;
           var id = req.session.entity_id;
           viewQuestionnnaireDataService.showQuestionnaires(id)
               .then(function(questionnaire){
                   res.render('answer-questionnaire', {
                       questionnaire : questionnaire,
                       user:req.session.user,
                       entity:req.session.entity
                   });
               });
       })
       .catch(function(err){
           next(err);
       });
};

exports.showQuestions = function (req, res, next) {
var questionnaire_id = req.params.questionnaire_id;
  req.getServices()
      .then(function(services){
          const questionDataService = services.questionDataService;
          questionDataService.showAll(questionnaire_id)
          .then(function(questions){
                  res.render('answer-questions', {
                      questions  : questions,
                      questionnaire_id  : questionnaire_id,
                      questionnaire_metric_id : questions[0].questionnaire_metric_id,
                      user:req.session.user,
                      entity:req.session.entity
                  });
          });
      })
      .catch(function(err){
          next(err);
      });
};

exports.answers = function  (req, res, next)  {
  req.getServices()
  .then(function(services){
    var data = {
      value:req.body.value,
      status: 'answered'
    };
    var questionnaire_id = req.params.questionnaire_id;
    var questionnaire_metric_id = req.params.questionnaire_metric_id;
    const answerDataService = services.answerDataService;
    answerDataService.answeredMetrics(data, questionnaire_metric_id)
    .then(function(results){
      res.redirect('/questionnaire/questions/' + questionnaire_id);
    })
      .catch(function(error){
        next(error);
      });
  })
}
