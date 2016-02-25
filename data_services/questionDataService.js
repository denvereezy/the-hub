const QueryService = require("../data_services/query-service");

module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.showAll = function(id) {
      return queryService.executeQuery('SELECT metric_id, title, description from questionnaire_metric inner join metric on metric_id = metric.id where questionnaire_id = ?', id -1);
    };
};
