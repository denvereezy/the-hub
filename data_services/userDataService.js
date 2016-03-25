const QueryService = require('../data_services/query-service');

module.exports = function (connection) {
  const queryService = new QueryService(connection);

  this.showEntityUsers = function (entity_id, user) {
    return queryService.executeQuery('select * from user where entity_id = ? and firstName != ?', [entity_id, user]);
  };

  this.deleteUser = function (id) {
    return queryService.executeQuery('delete from user where id = ?', id);
  };
};
