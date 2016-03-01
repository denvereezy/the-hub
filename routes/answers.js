const Promise = require('bluebird');

exports.show = function (req, res, next) {
   req.getServices()
       .then(function(services){
           const viewQuestionnnaireDataService = services.viewQuestionnnaireDataService;
           var id = req.session.entity_id;
           viewQuestionnnaireDataService.showQuestionnaires(id)
               .then(function(questionnaire){
                   res.render('answer-questionnaire', {
                       questionnaire : questionnaire
                   });
               });
       })
       .catch(function(err){
           next(err);
       });
};

exports.showQuestions = function (req, res, next) {
var id = req.params.id;
  req.getServices()
      .then(function(services){
          const questionDataService = services.questionDataService;
          questionDataService.showAll(id)
          .then(function(questions){
                  res.render('answers-questions', {
                      questions  : questions,
                      questionnaire_id  : id
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
    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.body.id;
    var questionnaire_id = req.params.id
    const answerDataService = services.answerDataService;
    answerDataService.answeredMetrics(data, id)
    .then(function(results){
      console.log(results);
      console.log(data);
      res.redirect('/questionnaire/questions/' + questionnaire_id);
    })
      .catch(function(error){
        next(error);
      });
  })
}
