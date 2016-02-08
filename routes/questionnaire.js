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

exports.add = function (req, res, next) {
    req.getServices()
      .then(function(services){
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            question_description : input.question_description,
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
//     var Id = req.params.Id;
//     var categoryDataService = services.categoryDataService;
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
// exports.update = function(req, res, next){
//   req.getServices()
//     .then(function(services){
//       var data = JSON.parse(JSON.stringify(req.body));
//       var Id = req.params.Id;
//       var categoryDataService = services.categoryDataService;
//       categoryDataService.updateCategory(data,Id)
//         .then(function(results){
//             var resultsCb = function(results){
//                 res.redirect('/setup-questionnaire');
//             };
//         })
//           .catch(function(err){
//                 next(err);
//         });
//     });
// };
//
// exports.delete = function(req, res, next){
//     req.getServices()
//       .then(function(services){
//         var Id = req.params.Id;
//         var categoryDataService = services.categoryDataService;
//         categoryDataService.deleteCategory(Id)
//           .then(function(results){
//               res.redirect('/setup-questionnaire');
//         })
//           .catch(function(err){
//                 next(err);
//         });
//     });
// };
