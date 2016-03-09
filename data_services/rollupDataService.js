const QueryService = require('../data_services/query-service');

module.exports = function (connection) {
const queryService = new QueryService(connection);
this.rollupMetrics = function(base_questionnaire_id){
       return queryService.executeQuery('SELECT name, sum(value) as value, title, description,base_questionnaire_id,metric_id FROM questionnaire inner join questionnaire_metric on questionnaire_id = questionnaire.id inner join metric on questionnaire_metric.metric_id = metric.id WHERE status = \'answered\' and base_questionnaire_id = ? group by metric_id',base_questionnaire_id);
   };
};
