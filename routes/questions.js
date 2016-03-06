const Promise = require('bluebird');

exports.show = function (req, res, next) {
var id = req.params.id;
var entity_id = req.session.entity_id;
  req.getServices()
      .then(function(services){
          const questionDataService = services.questionDataService;
          const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
          const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
            Promise.join(setupQuestionnaireDataService.getQuestionnaireById(id), questionDataService.showAll(id),allocateQuestionnaireDataService.showEntities(entity_id),
            function(questionnaire, questions,entities){
                  res.render('view-questions', {
                      questionnaire  : questionnaire,
                      questions  : questions,
                      entities  : entities,
                      questionnaire_id  : id,
                      user:req.session.user,
                      entity:req.session.entity
                  });
          });
      })
      .catch(function(err){
          next(err);
      });
};
