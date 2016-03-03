const QueryService = require("../data_services/query-service");

module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.showAll = function(questionnaire_id) {
      return queryService.executeQuery('SELECT questionnaire_metric.id as questionnaire_metric_id, metric_id, questionnaire_id, title, description, value from questionnaire_metric inner join metric on metric_id = metric.id where questionnaire_id = ?', questionnaire_id);
    };
};
