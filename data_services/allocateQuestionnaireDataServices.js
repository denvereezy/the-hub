const QueryService = require("../data_services/query-service");
module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.showEntity = function(id){
      return queryService.executeQuery('seclect * from entity where id != ?', id);
    };

    this.allocateQuestionnaire = function(data){
      return queryService.executeQuery('insert into questionnaire set ?', data;);
    };
};
