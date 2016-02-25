exports.show = function (req, res, next) {
  const id = req.params.id;
    req.getServices()
        .then(function(services){
            const questionDataService = services.questionDataService;
            questionDataService.showAll(id)
            .then(function(questions){
                    res.render('view-questions', {
                        questions  : questions,
                        questionnaire_id  : id
                    });
            });
        })
          .catch(function(err){
                next(err);
          });
};
