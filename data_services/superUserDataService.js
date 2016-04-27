const QueryService = require('../data_services/query-service');

module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.showRequests = function() {
        return queryService.executeQuery('select user.id as user_id, firstname, email, name, status from user inner join entity on user.entity_id = entity.id where status = \'pending\' or status = \'rejected\'');
    };

    this.handleRequest = function(data, id) {
        return queryService.executeQuery('update user set ? where id = ?', [data, id]);
    };
};
