const QueryService = require("../data_services/query-service");

module.exports = function(connection) {
  const queryService = new QueryService(connection);

  this.showAll = function(questionnaire_id) {
    return queryService.executeQuery('SELECT status, questionnaire_metric.id as questionnaire_metric_id, metric_id, questionnaire_id,base_questionnaire_id, title, description, value from questionnaire_metric inner join questionnaire on questionnaire_metric.questionnaire_id = questionnaire.id inner join metric on metric_id = metric.id where questionnaire_id = ?', questionnaire_id);
  };

  this.entityMetrics = function(entity_id) {
    return queryService.executeQuery('SELECT * from metric where entity_id = ?', entity_id);
  };

  this.editMetric = function(id) {
    return queryService.executeQuery('SELECT * FROM metric WHERE id = ?', id);
  };

  this.updateMetric = function(data, id) {
    return queryService.executeQuery('UPDATE metric SET ? WHERE id = ?', [data, id]);
  };

  this.showFacilitatorCrearedQuestions = function(questionnaire_id, entity_id) {
    return queryService.executeQuery('SELECT status, questionnaire_metric.id as questionnaire_metric_id, metric_id, questionnaire_id,base_questionnaire_id, title, description, value from questionnaire_metric inner join questionnaire on questionnaire_metric.questionnaire_id = questionnaire.id inner join metric on metric_id = metric.id where questionnaire_id = ? and entity_id = ?', [questionnaire_id, entity_id]);
  };
};
