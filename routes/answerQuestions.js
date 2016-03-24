const Promise = require('bluebird');

exports.showQuestions = function(req, res, next) {
  var questionnaire_id = req.params.questionnaire_id;
  var startup = req.session.type === 'Startup';
  req.getServices()
    .then(function(services) {
      const questionDataService = services.questionDataService;
      questionDataService.showAll(questionnaire_id)
        .then(function(questions) {
          for (var question in questions) {
            const submitted = questions[question].value > 0;
          };
          res.render('answer-questions', {
            questions: questions,
            questionnaire_id: questionnaire_id,
            questionnaire_metric_id: questions[0].questionnaire_metric_id,
            user: req.session.user,
            entity: req.session.entity,
            startup: startup,
            submitted: submitted
          });
        });
    })
    .catch(function(err) {
      next(err);
    });
};

exports.answers = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      var data = {
        value: req.body.value
      };
      var questionnaire_id = req.params.questionnaire_id;
      var questionnaire_metric_id = req.params.questionnaire_metric_id;
      const answerDataService = services.answerDataService;
      answerDataService.answeredMetrics(data, questionnaire_metric_id)
        .then(function(results) {
          res.redirect('/questionnaire/questions/' + questionnaire_id);
        })
        .catch(function(error) {
          next(error);
        });
    })
};

exports.answeredQuestionnaire = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      var questionnaire_id = req.params.questionnaire_id;
      const status = 'answered';
      const answerDataService = services.answerDataService;
      answerDataService.updateQuestionnaireStatus(status, questionnaire_id)
        .then(function(results) {
          res.redirect('/dashboard');
        })
        .catch(function(error) {
          next(error);
        });
    })
};


exports.releaseAnswersToDonor = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      var base_questionnaire_id = req.params.base_questionnaire_id;
      const rollupDataService = services.rollupDataService;
      rollupDataService.releaseMetricsToDonor(base_questionnaire_id)
        .then(function(results) {
          res.redirect('/dashboard');
        })
        .catch(function(error) {
          next(error);
        });
    })
};
