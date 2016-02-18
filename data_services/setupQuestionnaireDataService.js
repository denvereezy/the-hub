const QueryService = require("../data_services/query-service");

module.exports = function(connection){
    const queryService = new QueryService(connection);

    this.create = function(data){
        return queryService.executeQuery('INSERT INTO questionnaire set ?', data);
    };

    this.fetchEntityMetrics = function() {
        return queryService.executeQuery('SELECT * FROM metric WHERE entity_id = 1');
    };

    this.addMetricToMetricTable = function(data) {
        return queryService.executeQuery('INSERT INTO metric set ?', data);
    };

};
