const Promise = require('bluebird');

exports.show = function(req, res, next) {
  var id = req.params.id;
  var entity_id = req.session.entity_id;
  var base_questionnaire_id = req.params.base_questionnaire_id;
  const donor = req.session.type === 'Donor';
  const facilitator = req.session.type === 'Facilitator';
  req.getServices()
    .then(function(services) {
      const questionDataService = services.questionDataService;
      const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
      const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
      Promise.join(setupQuestionnaireDataService.getQuestionnaireById(id),
        questionDataService.showAll(id),
        allocateQuestionnaireDataService.showEntitiesForFacilitator(entity_id),
        questionDataService.showFacilitatorCreatedQuestions(entity_id),
        function(questionnaire, questions, entities, facilitatorQuestions) {
          res.render('view-questions', {
            questionnaire: questionnaire,
            questions: questions,
            entities: entities,
            questionnaire_id: id,
            facilitatorQuestions:facilitatorQuestions,
            donor: donor,
            facilitator: facilitator,
            user: req.session.user,
            entity: req.session.entity
          });
        });
    })
    .catch(function(err) {
      next(err);
    });
};

exports.metricResults = function(req, res, next) {
  var id = req.params.id;
  var entity_id = req.session.entity_id;
  var base_questionnaire_id = req.params.base_questionnaire_id;
  const donor = req.session.type === 'Donor';
  const facilitator = req.session.type === 'Facilitator';
  req.getServices()
    .then(function(services) {
      const rollupDataService = services.rollupDataService;
      Promise.join(
        rollupDataService.rollupMetrics(base_questionnaire_id),
        rollupDataService.donorMetrics(id),
        function(values, results) {
          res.render('questionnaire-results', {
            values: values,
            questionnaire_id: id,
            base_questionnaire_id: base_questionnaire_id,
            results: results,
            donor: donor,
            facilitator: facilitator,
            user: req.session.user,
            entity: req.session.entity
          });
        });
    })
    .catch(function(err) {
      next(err);
    });
};

exports.donorMetricResults = function(req, res, next) {
  var questionnaire_id = req.params.questionnaire_id;
  var entity_id = req.session.entity_id;
  const donor = req.session.type === 'Donor';
  req.getServices()
    .then(function(services) {
      const rollupDataService = services.rollupDataService;
        rollupDataService.donorMetrics(questionnaire_id),
        function(values) {
          res.render('donor-questionnaire-results', {
            values: values,
            questionnaire_id: questionnaire_id,
            donor: donor,
            user: req.session.user,
            entity: req.session.entity
          });
        });
    })
    .catch(function(err) {
      next(err);
    });
};

exports.edit = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      var id = req.params.metric_id;
      var questionnaire_id = req.params.questionnaire_id;
      const user = req.session.user;
      const entity = req.session.entity;
      const questionDataService = services.questionDataService;
      questionDataService.editMetric(id)
        .then(function(results) {
          res.render('editMetric', {
            metrics: results[0],
            user: user,
            entity: entity,
            questionnaire_id: questionnaire_id
          });
        })
        .catch(function(err) {
          next(err);
        });
    });
};

exports.update = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      var data = req.body;
      var id = req.params.metric_id;
      const questionDataService = services.questionDataService;
      questionDataService.updateMetric(data, id)
        .then(function(results) {
          res.redirect('/dashboard');
        })
        .catch(function(err) {
          next(err);
        });
    });
};

exports.linkFacilitatorMetricsToQuestionnaire = function(req, res, next) {
  var questionnaire_id = req.params.questionnaire_id;
  var setupQuestionnaireDataService;
  req.getServices()
    .then(function(services) {
      var rawMetricIds = req.body.selectedMetrics;
      // ensure that if only one question is selected we still have a list of metric ids - html quirk...
      const selectedMetricIds = Array.isArray(rawMetricIds) ? rawMetricIds : [rawMetricIds];
      setupQuestionnaireDataService = services.setupQuestionnaireDataService;
      return selectedMetricIds;
    })
    .mapSeries(function(metric_id) {
      var data = {
        metric_id: metric_id,
        questionnaire_id: questionnaire_id
      };
      return setupQuestionnaireDataService.linkMetricToQuestionnaire(data);
    })
    .then(function(results) {
      res.redirect('/questionnaire/questions/view/' + questionnaire_id);
    })
    .catch(function(err) {
      next(err);
    });
};
