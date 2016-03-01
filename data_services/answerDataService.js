const QueryService = require('../data_services/query-service');

module.exports = function (connection) {
const queryService = new QueryService(connection);
this.answeredMetrics = function(data,questionnaire_metric_id){
       return queryService.executeQuery('UPDATE questionnaire_metric SET ? WHERE id = ?', [data, questionnaire_metric_id]);
   };
};
