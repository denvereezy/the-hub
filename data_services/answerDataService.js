const QueryService = require('../data_services/query-service');

module.exports = function (connection) {
  const queryService = new QueryService(connection);

  this.answeredMetrics = function(data,questionnaire_metric_id){
    return queryService.executeQuery('UPDATE questionnaire_metric SET ? WHERE id = ?', [data, questionnaire_metric_id]);
  };

  this.rollupMetricsToDonor = function(status, questionnaire_id){
    return queryService.executeQuery('UPDATE questionnaire_metric SET status = ? WHERE questionnaire_id = ?', [status, questionnaire_id]);
  };

  this.updateQuestionnaireStatus = function(questionnaire_id, status){
    return queryService.executeQuery('UPDATE questionnaire_metric SET status = ? WHERE questionnaire_id = ?', [status, questionnaire_id]);
  };
};
