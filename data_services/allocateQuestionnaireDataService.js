const QueryService = require("../data_services/query-service");
module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.showEntities = function(id)  {
      return queryService.executeQuery('select * from entity where id != ?', id);
    };

    this.allocateQuestionnaire = function(data) {
      return queryService.executeQuery('insert into questionnaire set ?', data);
    };

    this.questionnaireInfo = function(questionnaire_id) {
      return queryService.executeQuery('select * from questionnaire where id  = ?', questionnaire_id);
    };
};
