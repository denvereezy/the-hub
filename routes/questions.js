const Promise = require('bluebird');

exports.show = function (req, res, next) {
var id = req.params.id;
var entity_id = req.session.entity_id;
var base_questionnaire_id = req.params.base_questionnaire_id;
const donor = req.session.type === 'Donor';
const facilitator = req.session.type === 'Facilitator';
  req.getServices()
      .then(function(services){
          const questionDataService = services.questionDataService;
          const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
          const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
          const rollupDataService = services.rollupDataService;
            Promise.join(setupQuestionnaireDataService.getQuestionnaireById(id),
                          questionDataService.showAll(id),
                          allocateQuestionnaireDataService.showEntities(entity_id),
                          rollupDataService.rollupMetrics(base_questionnaire_id),
            function(questionnaire, questions, entities, values){
                  res.render('view-questions', {
                      questionnaire  : questionnaire,
                      questions  : questions,
                      entities  : entities,
                      questionnaire_id  : id,
                      values : values,
                      donor:donor,
                      facilitator:facilitator,
                      user:req.session.user,
                      entity:req.session.entity
                  });
          });
      })
      .catch(function(err){
          next(err);
      });
};
