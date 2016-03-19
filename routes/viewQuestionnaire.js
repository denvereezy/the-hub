const Promise = require('bluebird');

exports.show = function(req, res, next) {
  req.getServices()
    .then(function(services) {
      const donor = req.session.type === 'Donor';
      const facilitator = req.session.type === 'Facilitator';
      const startup = req.session.type === "Startup";
      const viewQuestionnnaireDataService = services.viewQuestionnnaireDataService;
      const questionDataService = services.questionDataService;
      var id = req.session.entity_id;
      Promise.join(viewQuestionnnaireDataService.showQuestionnaires(id),
       viewQuestionnnaireDataService.showCreatedQuestionnaires(id),
       questionDataService.entityMetrics(id),
        function(questionnaire, donorQuestionnaires, metricsList) {
          res.render('dashboard', {
            facilitatorQuestionnaire: questionnaire,
            donorQuestionnaires: donorQuestionnaires,
            metricsList:metricsList,
            questionnaire: questionnaire,
            user: req.session.user,
            entity: req.session.entity,
            donor: donor,
            facilitator: facilitator,
            startup: startup
          });
        });
    })
    .catch(function(err) {
      next(err);
    });
};
