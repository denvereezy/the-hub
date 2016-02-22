// var Promise = require('bluebird');

/////////////////////////////////////////////////////////////////
/////////////////// Setup Questionnaire ////////////////////////
////////////////////////////////////////////////////////////////

////setup-question-step-2
exports.show = function (req, res, next) {

   req.getServices()
       .then(function(services){
           const viewQuestionnnaireDataService = services.viewQuestionnnaireDataService;
           const id = req.session.entity_id;
           viewQuestionnnaireDataService.showQuestionnaires(id)
               .then(function(questionnaire){
                   res.render('view-questionnaire', {
                       questionnaire : questionnaire
                   });
               });
       })
       .catch(function(err){
           next(err);
       });
};
