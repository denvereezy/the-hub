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
                          allocateQuestionnaireDataService.showEntitiesForFacilitator(entity_id),
            function(questionnaire, questions, entities){
                  res.render('view-questions', {
                      questionnaire  : questionnaire,
                      questions  : questions,
                      entities  : entities,
                      questionnaire_id  : id,
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

exports.metricResults = function (req, res, next) {
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
                          allocateQuestionnaireDataService.showEntitiesForDonor(entity_id),
                          rollupDataService.rollupMetrics(base_questionnaire_id),
                          rollupDataService.donorMetrics(id),
            function(questionnaire, questions, entities, values, results){
                  res.render('questionnaire-results', {
                      questionnaire  : questionnaire,
                      questions  : questions,
                      entities  : entities,
                      values : values,
                      questionnaire_id  : id,
                      base_questionnaire_id:base_questionnaire_id,
                      results:results,
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
