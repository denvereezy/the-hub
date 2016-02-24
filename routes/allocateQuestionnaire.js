exports.show = function (req, res, next) {
  const id = req.session.entity_id;
    req.getServices()
        .then(function(services){
            const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
            allocateQuestionnaireDataService.showEntities(id)
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
      const allocateQuestionnaireDataService = services.allocateQuestionnaireDataService;
      allocateQuestionnaireDataService.allocateQuestionnaire(data)
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
