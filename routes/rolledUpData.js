exports.show = function (req, res, next) {
   req.getServices()
       .then(function(services){
           const rollupDataService = services.rollupDataService;
           var base_questionnaire_id = req.body.base_questionnaire_id;
           rollupDataService.rollupMetrics(base_questionnaire_id)
               .then(function(values){
                   res.render('questionnaire-results', {
                       values : values,
                       user:req.session.user,
                       entity:req.session.entity
                   });
               });
       })
       .catch(function(err){
           next(err);
       });
};
