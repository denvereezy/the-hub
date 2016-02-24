exports.show = function (req, res, next) {
  const id = req.params.id;
    req.getServices()
        .then(function(services){
            const allocateQuestionnaireDataServices = services.allocateQuestionnaireDataServices;
            questionDataService.showEntities(id)
            .then(function(entities){
                    res.render('allocateQuestionnaire', {
                        entities  : entities
                    });
            });
        })
          .catch(function(err){
                next(err);
          });
};


exports.allocate = function(req, res, next){

  req.getServices()
    .then(function(services){
        const data = {
            entity_id : req.session.entity_id,
            name : req.body.name,
            dueDate : req.body.dueDate
        };
      const allocateQuestionnaireDataServices = services.allocateQuestionnaireDataServices;
      setupQuestionnaireDataService.allocateQuestionnaire(data)
        .then(function(results){
            const id = results.insertId;
          res.render('allocate_questionnaire',{
              questionnaire : questionnaire
          });
        });
    })
    .catch(function(error){
        next(error);
    });
};
