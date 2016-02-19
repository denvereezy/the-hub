const QueryService = require("../data_services/query-service");

module.exports = function(connection){
  const queryService = new QueryService(connection);

    this.addEntity = function(entity){
      return queryService.executeQuery('insert into entity set ?', entity);
    };

    this.addUser = function(user){
      return queryService.executeQuery('insert into user set ?', user);
    };

};
