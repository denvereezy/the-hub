const QueryService = require("../data_services/query-service");

module.exports = function(connection) {
    const queryService = new QueryService(connection);
    this.showQuestionnaires = function(id) {
      return queryService.executeQuery('SELECT id, entity_id, name, DATE_FORMAT(dueDate,"%d %b %y") as dueDate FROM questionnaire WHERE parent_questionnaire_id != \'null\' and entity_id = ?', id)
    };
};
