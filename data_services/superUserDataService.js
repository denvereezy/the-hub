const QueryService = require('../data_services/query-service');

module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.showRequests = function() {
        return queryService.executeQuery('select firstname, email, name from user inner join entity on user.entity_id = entity.id where status = \'pending\'');
    };
};
