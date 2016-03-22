const QueryService = require('../data_services/query-service');

module.exports = function (connection) {
  const queryService = new QueryService(connection);

  this.showEntityUsers = function (entity_id) {
    return queryService.executeQuery('select * from user where entity_id = ?', entity_id);
  };

  this.deleteUser = function (id) {
    return queryService.executeQuery('delete from user where id = ?', id);
  };
};
