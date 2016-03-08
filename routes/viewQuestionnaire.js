exports.show = function (req, res, next) {
   req.getServices()
       .then(function(services){
           const donor = req.session.type === 'Donor';
           const facilitator = req.session.type === 'Facilitator';
           const viewQuestionnnaireDataService = services.viewQuestionnnaireDataService;
           var id = req.session.entity_id;
           viewQuestionnnaireDataService.showQuestionnaires(id)
               .then(function(questionnaire){
                   res.render('view-questionnaire', {
                       questionnaire : questionnaire,
                       facilitatorQuestionnaire:questionnaire,
                       user:req.session.user,
                       entity:req.session.entity,
                       donor:donor,
                       facilitator:facilitator
                   });
               });
       })
       .catch(function(err){
           next(err);
       });
};

exports.showResults = function (req, res, next) {
   req.getServices()
       .then(function(services){
           const donor = req.session.type === 'Donor';
           const facilitator = req.session.type === 'Facilitator';
           const viewQuestionnnaireDataService = services.viewQuestionnnaireDataService;
           var id = req.session.entity_id;
           viewQuestionnnaireDataService.showQuestionnaires(id)
               .then(function(questionnaire){
                   res.render('rollup', {
                       facilitatorQuestionnaire:questionnaire,
                       user:req.session.user,
                       entity:req.session.entity,
                       facilitator:facilitator
                   });
               });
       })
       .catch(function(err){
           next(err);
       });
};
