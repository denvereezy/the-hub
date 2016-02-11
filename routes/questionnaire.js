const Promise = require("bluebird");

exports.show = function (req, res, next) {
  req.getServices()
  .then(function(services){
    const questionnaireDataService = services.questionnaireDataService;
    console.log(questionnaireDataService);
    Promise.join(questionnaireDataService.entity() , questionnaireDataService.questionnaire(),
    function(entity,questionnaire){
      res.render( 'setup-questionnaire-step-1', {
        entity : entity,
        questionnaire : questionnaire
      });
    })
    .catch(function(err){
      next(err);
    });
  });
};
//comment
exports.add = function (req, res, next) {
  req.getServices()
      .then(function(services){
          const questionDataService = services.questionDataService;
          Promise.join( questionDataService.questions(),
                        questionDataService.questionnaire(),

            function(entity, questionnaire){
                res.render( 'setup-questionnaire-step-1', {
                    entity : entity,
                    questionnaire : questionnaire
                });
      })
      .catch(function(err){
        next(err);
      });
  });
};

exports.add = function (req, res, next) {
    req.getServices()
      .then(function(services){
        const input = JSON.parse(JSON.stringify(req.body));
        const data = {
            entity_id : input.entity_id,
            due_date : input.due_date,
            questionnaire_name : input.questionnaire_name

        };
        const questionnaireDataService = services.questionnaireDataService;
        questionnaireDataService.addQuestion(data)
          .then(function(results){
              res.redirect('/setup-questionnaire-step-2/show');
          })
            .catch(function(err){
                next(err);
    });
});
};


exports.get = function(req, res, next){
  req.getServices()
    .then(function(services){
    const id = req.params.question_id;
    const questionnaireDataService = services.questionnaireDataService;
    questionnaireDataService.editQuestion(id)
      .then(function(results){
            res.render('edit_questionnaire',{data : results[0]});
      })
          .catch(function(err){
                next(err);
        });
    });
};

exports.update = function(req, res, next){
  req.getServices()
    .then(function(services){
      const data = JSON.parse(JSON.stringify(req.body));
      const id = req.params.question_id;
      const questionnaireDataService = services.questionnaireDataService;
      questionnaireDataService.updateQuestion(data,id)
        .then(function(results){
            const resultsCb = function(results){
                res.redirect('/setup-questionnaire-step-1');
            };
        })
          .catch(function(err){
                next(err);
        });
    });
};

exports.delete = function(req, res, next){
    req.getServices()
      .then(function(services){
        const id = req.params.questionnaire_id;
        const questionnaireDataService = services.questionnaireDataService;
        questionnaireDataService.deleteQuestionnaire(id)
          .then(function(results){
              res.redirect('/setup-questionnaire-step-1');
        })
          .catch(function(err){
                next(err);
        });
    });
};
