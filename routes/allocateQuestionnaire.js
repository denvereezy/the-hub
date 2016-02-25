exports.show = function (req, res, next) {
  const id = req.session.entity_id;
  const questionnaire_id = req.params.id;
    req.getServices()
        .then(function(services){
            const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
            allocateQuestionnaireDataService.showEntities(id)
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
  req.getServices()
    .then(function(services){
        const data = {
            entity_id : req.body.entity_id,
            parent_questionnaire_id : questionnaire_id
        };
      const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
      allocateQuestionnaireDataService.questionnaireInfo(questionnaire_id)
      .then(function(info){
          data.name = info[0].name;
          data.dueDate = info[0].dueDate;
          return allocateQuestionnaireDataService.allocateQuestionnaire(data);
      })
        .then(function(data){

        })
          .then(function(results){
            res.redirect('/dashboard');
          })
            .catch(function(error){
              next(error);
            });
    });

};
