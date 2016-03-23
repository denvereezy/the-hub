const Promise = require('bluebird');

exports.create = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      var data = {
        entity_id: req.session.entity_id,
        name: req.body.name,
        dueDate: req.body.dueDate
      };
      const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
      setupQuestionnaireDataService.create(data)
        .then(function(results) {
          var id = results.insertId;
          res.redirect('/questionnaire/setup/step2/' + id);
        })
    })
    .catch(function(err) {
      next(err);
    });
};

exports.show = function(req, res, next) {
  var questionnaire_id = req.params.id;
  var donor = req.session.type === 'Donor';
  req.getServices()
    .then(function(services) {
      const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
      var entity_id = req.session.entity_id;

      setupQuestionnaireDataService.fetchEntityMetrics(entity_id)
        .then(function(metrics) {
          res.render('setup-questionnaire-step-2', {
            metrics: metrics,
            questionnaire_id: questionnaire_id,
            user: req.session.user,
            entity: req.session.entity,
            donor: donor
          });
        });
    })
    .catch(function(err) {
      next(err);
    });
};

exports.addMetricToMetricTable = function(req, res, next) {
  var questionnaire_id = req.params.id;
  req.getServices()
    .then(function(services) {
      var data = {
        title: req.body.title,
        description: req.body.description,
        entity_id: req.session.entity_id
      };
      const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
      setupQuestionnaireDataService.addMetricToMetricTable(data)
        .then(function(results) {
          res.redirect('/questionnaire/setup/step2/' + questionnaire_id);
        });
    })
    .catch(function(err) {
      next(err);
    });
};

exports.linkMetricToQuestionnaire = function(req, res, next) {
  var questionnaire_id = req.params.id;
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
      res.redirect('/questionnaire/allocate/' + questionnaire_id);
    })
    .catch(function(err) {
      next(err);
    });
};
