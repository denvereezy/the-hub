exports.allocate = function(req, res, next){

  req.getServices()
    .then(function(services){
        const data = {
            entity_id : req.session.entity_id,
            name : req.body.name,
            dueDate : req.body.dueDate
        };
      const setupQuestionnaireDataService  = services.allocateQuestionnaire;
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
