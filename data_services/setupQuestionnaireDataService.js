const QueryService = require("../data_services/query-service");

module.exports = function(connection) {
  const queryService = new QueryService(connection);

  this.create = function(data) {
    return queryService.executeQuery('INSERT INTO questionnaire set ?', data);
  };

  this.fetchEntityMetrics = function(entity_id) {
    return queryService.executeQuery('SELECT * FROM metric WHERE entity_id = ?', [entity_id]);
  };

  this.addMetricToMetricTable = function(data) {
    return queryService.executeQuery('INSERT INTO metric set ?', data);
  };

  this.linkMetricToQuestionnaire = function(data) {
    return queryService.executeQuery('INSERT INTO questionnaire_metric set ?', data);
  };

  this.getQuestionnaireById = function(id) {
    return queryService.executeQuery('SELECT * FROM questionnaire WHERE id = ?', [id]);
  };

  this.editMetric = function(id) {
    return queryService.executeQuery('SELECT * FROM metric WHERE id = ?', id);
  };

  this.updateMetric = function(data, id) {
    return queryService.executeQuery('UPDATE metric SET ? WHERE id = ?', [data, id]);
  };
};
