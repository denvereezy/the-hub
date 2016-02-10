exports.show = function (req, res, next) {
    req.getServices()
      .then(function(services){
          const questionDataService = services.questionDataService;
          questionDataService.questions()
            .then(function(results){
                res.render( 'setup-questionnaire', {
                    questions : results
                });
        })
          .catch(function(err){
              next(err);
    });
});
};

exports.name_questionnaire = function (req, res, next) {
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

//
// exports.get = function(req, res, next){
//   req.getServices()
//     .then(function(services){
//     const Id = req.params.Id;
//     const categoryDataService = services.categoryDataService;
//     categoryDataService.editCategory(Id)
//       .then(function(results){
//             res.render('edit',{data : results[0]});
//       })
//           .catch(function(err){
//                 next(err);
//         });
//     });
// };
//
exports.update = function(req, res, next){
  req.getServices()
    .then(function(services){
      const data = JSON.parse(JSON.stringify(req.body));
      const id = req.params.question_id;
      const questionDataService = services.questionDataService;
      questionDataService.updateQuestion(data,id)
        .then(function(results){
            const resultsCb = function(results){
                res.redirect('/setup-questionnaire/show');
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
        const id = req.params.question_id;
        const questionDataService = services.questionDataService;
        questionDataService.deleteQuestion(id)
          .then(function(results){
              res.redirect('/setup-questionnaire/show');
        })
          .catch(function(err){
                next(err);
        });
    });
};
