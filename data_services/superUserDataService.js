const QueryService = require('../data_services/query-service');

module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.showRequests = function() {
        return queryService.executeQuery('select firstname, email, name from user inner join entity on user.entity_id = entity.id where status = \'pending\'');
    };

    this.acceptRequest = function(id) {
        return queryService.executeQuery('update user');
    };

    this.rejectRequest = function(id) {
        return queryService.executeQuery('delete from');
    };
};
