const QueryService = require('../data_services/query-service');

module.exports = function (connection) {
const queryService = new QueryService(connection);
this.answeredMetrics = function(data,id){
       return queryService.executeQuery('UPDATE questionnaire_metric SET ? WHERE id = ?', [data, id]);
   };
};
