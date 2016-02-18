const QueryService = require("../data_services/query-service");

module.exports = function(connection){
    const queryService = new QueryService(connection);

    this.create = function(data){
        return queryService.executeQuery('INSERT INTO questionnaire set ?', data);
    };

};
