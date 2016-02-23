const Promise = require('bluebird');

//setup-question-step-1
exports.create = function (req, res, next) {
    req.getServices()
        .then(function(services){
            const data = {
                entity_id : req.session.entity_id,
                name : req.body.name,
                dueDate : req.body.dueDate
            };
            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
            setupQuestionnaireDataService.create(data)
                .then(function(results){
                  const id = results.insertId;
                    res.redirect('/questionnaire/setup/step2/' + id);
                })
        })
          .catch(function(err){
              next(err);
          });
};

//setup-question-step-2
exports.show = function (req, res, next) {
  var questionnaire_id = req.params.id;
    req.getServices()
        .then(function(services){
            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
            const entity_id = req.session.entity_id;

            Promise.join(setupQuestionnaireDataService.fetchEntityMetrics(entity_id), setupQuestionnaireDataService.showEntity(),
             function(metrics, entities){
                    res.render('setup-questionnaire-step-2', {
                        metrics  : metrics,
                        entities  : entities,
                        questionnaire_id : questionnaire_id
                    });
            });
        })
          .catch(function(err){
                next(err);
          });
};

exports.addMetricToMetricTable = function (req, res, next) {
    req.getServices()
        .then(function(services){
            const data = {
                title : req.body.title,
                description : req.body.description,
                entity_id : req.session.entity_id
            };
            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
            setupQuestionnaireDataService.addMetricToMetricTable(data)
                .then(function(results){
                    res.redirect('/questionnaire/setup/step2/:id');
                });
        })
          .catch(function(err){
            next(err);
          });
};

exports.linkMetricToQuestionnaire = function (req, res, next) {
    var questionnaire_id = req.params.id;
    req.getServices()
        .then(function(services){
            const data = {
                title : req.body.title,
                description : req.body.description,
                entity_id : req.session.entity_id
            };
            const selectedMetricIds = req.body.selectedMetrics;
            const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
            const databaseCalls = [];

            function insertArrayIntoQuestionnaireMetric(selectedMetricIds) {
                if (selectedMetricIds.length > 0) {
                    for (i = 0; i < selectedMetricIds.length; i++) {
                        const data2 = {
                            metric_id : selectedMetricIds[i],
                            questionnaire_id : questionnaire_id
                        };
                        const response = setupQuestionnaireDataService.linkMetricToQuestionnaire(data2);
                        databaseCalls.push(response);
                    }
                    return Promise.all(databaseCalls);
                }
            };
            return insertArrayIntoQuestionnaireMetric(selectedMetricIds);
        })
          .then(function(results) {
              res.redirect('/questionnaire/setup/step3/' + questionnaire_id);
          })
            .catch(function(err){
                next(err);
            });
};

//setup-questionnaire-step-3
exports.sendQuestionnaire = function(req, res, next){
  req.getServices()
  .then(function(services){
      const data = {
          title : 'to be completed',
          description : 'something something',
          entity_id : req.body.entity_id
      };
      const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
      setupQuestionnaireDataService.addMetricToMetricTable(data)
          .then(function(results){
              res.redirect('/dashboard');
          });
  })
    .catch(function(err){
        next(err);
    });
};

//derived-setup-questionnaire-step-1
// exports.show = function (req, res, next) {
//
//     req.getServices()
//         .then(function(services){
//             const setupQuestionnaireDataService = services.setupQuestionnaireDataService;
//
//               const entity_id = req.session.entity_id;
//
//             setupQuestionnaireDataService.fetchEntityMetrics(entity_id)
//                 .then(function(metric){
//                     res.render('setup-questionnaire', {
//                         metric : metric
//                     });
//                 });
//         })
//         .catch(function(err){
//             next(err);
//         });
// };
