const QueryService = require("../data_services/query-service");
const Promise = require('bluebird');
const SetupQuestionnaireDataService = require("../data_services/setupQuestionnaireDataService");

module.exports = function(connection) {
    const queryService = new QueryService(connection);
    const sdqs = new SetupQuestionnaireDataService(connection);

    this.showEntitiesForDonor = function(id) {
        return queryService.executeQuery('select * from entity where id != ? and type = \'Facilitator\'', id);
    };

    this.showEntitiesForFacilitator = function(id) {
        return queryService.executeQuery('select * from entity where id != ? and type = \'Startup\'', id);
    };

    this.createChildQuestionnaire = function(data) {
        return queryService.executeQuery('insert into questionnaire set ?', data);
    };

    this.metricsInParentQuestionnaire = function(parent_questionnaire_id) {
        return queryService.executeQuery('select * from questionnaire_metric where questionnaire_id = ?', parent_questionnaire_id);
    };

    this.allocateMetricListToQuestionaire = function(target_questionnaire_id, metric_list) {
        return Promise
            .mapSeries(metric_list, function(metric_row) {
                return sdqs.linkMetricToQuestionnaire({
                    questionnaire_id: target_questionnaire_id,
                    metric_id: metric_row.metric_id
                });
            });
    };

    this.questionnaireInfo = function(questionnaire_id) {
        return queryService.executeQuery('select * from questionnaire where id  = ?', questionnaire_id);
    };

    this.showCreatedQuestionnaireInfo = function(entity_id, questionnaire_id) {
        return queryService.executeQuery('select questionnaire.name, entity.id as entity_id,questionnaire.id as questionnaire_id,title,description from questionnaire_metric inner join questionnaire on questionnaire_id = questionnaire.id inner join metric on metric_id = metric.id inner join entity on questionnaire.entity_id = entity.id where entity.id = ? and questionnaire.id = ?', [entity_id, questionnaire_id]);
    };
};
