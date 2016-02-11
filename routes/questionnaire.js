const Promise = require("bluebird");

exports.show = function (req, res, next) {
  req
      .getServices()
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
        const questionDataService = services.questionDataService;
        questionDataService.addQuestion(data)
          .then(function(results){
              res.redirect('/setup-questionnaire-step-2');
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
    const questionDataService = services.questionDataService;
    questionDataService.editQuestion(id)
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
      const questionDataService = services.questionDataService;
      questionDataService.updateQuestion(data,id)
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
        const questionDataService = services.questionDataService;
        questionDataService.deleteQuestionnaire(id)
          .then(function(results){
              res.redirect('/setup-questionnaire-step-1');
        })
          .catch(function(err){
                next(err);
        });
    });
};
