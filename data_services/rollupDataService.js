const QueryService = require('../data_services/query-service');

module.exports = function (connection) {
const queryService = new QueryService(connection);
this.rollupMetrics = function(){
       return queryService.executeQuery();
   };
};
