const Promise = require('bluebird');

exports.show = function (req, res, next) {
    req.getServices()
        .then(function(services){
            const invitationDataService = services.invitationDataService;
            Promise.join(invitationDataService.invitations() , invitationDataService.maxId(),
                function(invitations, questionnaire){
                    res.render( 'setup-questionnaire-step-3', {
                        invitations : invitations,
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
                invitations_email : input.invitations_email,
                invitations_status : false,
                questionnaire_id  : input.questionnaire_id
            };
            const invitationDataService = services.invitationDataService;
            invitationDataService.addInvitation(data)
                .then(function(results){
                    res.redirect('/setup-questionnaire-step-3/show');
                })
                .catch(function(err){
                    next(err);
                });
        });
};