exports.add = function (req, res, next) {
    req.getServices()
      .then(function(services){
        const input = JSON.parse(JSON.stringify(req.body));
        const data = {
            questionnaire_name : input.questionnaire_name,
        };
        const questionDataService = services.questionDataService;
        questionDataService.addQuestion(data)
          .then(function(results){
              res.redirect('/setup-questionnaire');
          })
            .catch(function(err){
                next(err);
    });
});
};
