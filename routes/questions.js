exports.show = function (req, res, next) {
  const id = req.params.id;
    req.getServices()
        .then(function(services){
            const questionDataService = services.questionDataService;
            questionDataService
            .showAll(id)
            .then(function(){
              // get the questionnaire
            })
            .then(function(questions){
                    res.render('view-questions', {
                        questions  : questions,
                        questionnaire  : questionnaire,
                        questionnaire_id  : id,

                    });
            });
        })
          .catch(function(err){
                next(err);
          });
};
