const Promise = require('bluebird');

// exports.show = function(req, res, next) {
//   req.getServices()
//     .then(function(services) {
//       const startup = req.session.type === "Startup";
//       console.log(startup);
//       const viewQuestionnnaireDataService = services.viewQuestionnnaireDataService;
//       const questionDataService = services.questionDataService;
//       var id = req.session.entity_id;
//       Promise.join(viewQuestionnnaireDataService.showQuestionnaires(id),
//       questionDataService.entityMetrics(id),
//         function(questionnaire, metricsList) {
//           console.log(metricsList);
//           res.render('dashboard', {
//             // questionnaire: questionnaire,
//             metricsList: metricsList,
//             startup: startup,
//             user: req.session.user,
//             entity: req.session.entity
//           });
//         });
//     })
//     .catch(function(err) {
//       next(err);
//     });
// };

exports.showQuestions = function(req, res, next) {
  var questionnaire_id = req.params.questionnaire_id;
  req.getServices()
    .then(function(services) {
      const questionDataService = services.questionDataService;
      questionDataService.showAll(questionnaire_id)
        .then(function(questions) {
          res.render('answer-questions', {
            questions: questions,
            questionnaire_id: questionnaire_id,
            questionnaire_metric_id: questions[0].questionnaire_metric_id,
            user: req.session.user,
            entity: req.session.entity
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


exports.releaseAnsweresToDonor = function(req, res, next) {
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
