const QueryService = require("../data_services/query-service");

module.exports = function(connection){
    const queryService = new QueryService(connection);

    this.questions = function(){
        return queryService.executeQuery('SELECT * FROM questionnaire_questions WHERE questionnaire_id = (SELECT MAX( questionnaire_id ) FROM questionnaire_questions)');
    };

    this.questionnaire = function(){
        return queryService.executeQuery('select questionnaire_id, DATE_FORMAT(due_date,"%d %b %y") as due_date, questionnaire_name from questionnaire_questions');
    };

    this.maxId = function(){
        return queryService.executeQuery('select max(questionnaire_id) as questionnaire_id from questionnaires');
    };
};
