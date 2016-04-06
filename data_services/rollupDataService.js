const QueryService = require('../data_services/query-service');

module.exports = function(connection) {
  const queryService = new QueryService(connection);
  this.rollupMetrics = function(base_questionnaire_id) {
    return queryService.executeQuery('SELECT questionnaire.id as questionnaire_id, name, sum(value) as value, title, description, metric_id, questionnaire_metric.id as questionnaire_metric_id FROM questionnaire inner join questionnaire_metric on questionnaire_id = questionnaire.id inner join metric on questionnaire_metric.metric_id = metric.id WHERE status = \'answered\' group by metric_id, name, title, description, questionnaire_id, questionnaire_metric_id', base_questionnaire_id);
  };

  this.releaseMetricsToDonor = function(base_questionnaire_id) {

    const findSQL = "SELECT  base_questionnaire_id, metric_id, sum(value) as value, name FROM questionnaire " +
      "inner join questionnaire_metric on questionnaire_id = questionnaire.id " +
      "inner join metric on questionnaire_metric.metric_id = metric.id " +
      "WHERE status = \'answered\' and base_questionnaire_id = ? group by metric_id, value, name, base_questionnaire_id";

    const updateSQL = "update questionnaire_metric set value = ?, status = \'released\' where questionnaire_id = ? and metric_id = ?";

    return queryService
      .executeQuery(findSQL, [base_questionnaire_id])
      .mapSeries(function(metricDetails) {
        return queryService.executeQuery(updateSQL, [metricDetails.value,
          metricDetails.base_questionnaire_id,
          metricDetails.metric_id
        ])
      });

  };

  this.donorMetrics = function(id) {
    return queryService.executeQuery('SELECT  questionnaire_id,metric_id, value, name,title, description FROM questionnaire inner join questionnaire_metric on questionnaire_id = questionnaire.id inner join metric on questionnaire_metric.metric_id = metric.id WHERE status = \'released\' and questionnaire_id = ?', id);
  };
};
