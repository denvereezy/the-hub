const QueryService = require("../data_services/query-service");

module.exports = function(connection) {
    const queryService = new QueryService(connection);

    //this.fetchEntityMetrics = function() {
    //    return queryService.executeQuery('SELECT * FROM metric WHERE entity_id = 1'); //Todo entity hard coded until params in url
    //};
    //
    //this.addMetricToMetricTable = function(data) {
    //    return queryService.executeQuery('INSERT INTO metric set ?', data);
    //};

};