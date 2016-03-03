exports.show = function (req, res, next) {
  var entity_id = req.session.entity_id;
  var questionnaire_id = req.params.id;
    req.getServices()
        .then(function(services){
            const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
            allocateQuestionnaireDataService.showEntities(entity_id)
            .then(function(entities){
                    res.render('allocateQuestionnaire', {
                        entities  : entities,
                        questionnaire_id  : questionnaire_id
                    });
            });
        })
          .catch(function(err){
                next(err);
          });
};

exports.allocate = function(req, res, next){
  var questionnaire_id = req.params.id;
  var childQuestionnaireId = null;
  var data = {
      entity_id : req.body.entity_id,
      parent_questionnaire_id : questionnaire_id,
      base_questionnaire_id : questionnaire_id
  };
  req.getServices()
    .then(function(services){
      const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
      allocateQuestionnaireDataService.questionnaireInfo(questionnaire_id)
      .then(function(info){
          data.name = info[0].name;
          data.dueDate = info[0].dueDate;
          return allocateQuestionnaireDataService.createChildQuestionnaire(data);
      })
      .then(function(result){
          childQuestionnaireId = result.insertId;
          return allocateQuestionnaireDataService.metricsInParentQuestionnaire(data.parent_questionnaire_id)
        })
      .then(function(parent_questionnaire_metrics){
          return allocateQuestionnaireDataService.allocateMetricListToQuestionaire(childQuestionnaireId, parent_questionnaire_metrics);
      })
          .then(function(results){
            res.redirect('/dashboard');
          })
            .catch(function(error){
              next(error);
            });
    });
};

exports.allocateToSubEntity = function(req, res, next){
  var questionnaire_id = req.params.questionnaire_id;
  var childQuestionnaireId = null;
  var data = {
      entity_id : req.body.entity_id,
      parent_questionnaire_id : questionnaire_id,
      metric_ids  : req.body.selectedMetrics
  };
  req.getServices()
    .then(function(services){
      const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
      allocateQuestionnaireDataService.questionnaireInfo(questionnaire_id)
      .then(function(info){
          var questionnaireData = {
              dueDate : info[0].dueDate,
              name : info[0].name,
              entity_id : data.entity_id,
              parent_questionnaire_id : data.parent_questionnaire_id,
              base_questionnaire_id : info[0].base_questionnaire_id
          };

          return allocateQuestionnaireDataService.createChildQuestionnaire(questionnaireData);
      })
      .then(function(result){
          var questionnaireId = result.insertId;
          var metric_ids = data.metric_ids.map(function(m){return {metric_id : m}});
          console.log('metric' + metric_ids);
          return allocateQuestionnaireDataService.allocateMetricListToQuestionaire(questionnaireId, metric_ids);
      })
          .then(function(results){
            res.redirect('/dashboard');
          })
            .catch(function(error){
              next(error);
            });
    });


};
