const QueryService = require("../data_services/query-service");

module.exports = function(connection){
  const queryService = new QueryService(connection);

    this.entity = function(){
        return queryService.executeQuery('select * from entity');
    };

    this.addQuestion = function(data){
        return queryService.executeQuery('insert into questionnaires set ?', data);
    };

    this.questionnaire = function(){
        return queryService.executeQuery('select questionnaire_id, DATE_FORMAT(due_date,"%d %b %y") as due_date, questionnaire_name from questionnaires');
    };

    this.editQuestion = function(id){
        return queryService.executeQuery('SELECT * FROM questionnaires WHERE question_id = ?', [id]);
    };

    this.updateQuestion = function(data,id){
        return queryService.executeQuery('UPDATE questionnaires SET ? WHERE question_id = ?', [data, id]);
    };

    this.deleteQuestionnaire = function(id){
        return queryService.executeQuery('DELETE FROM questionnaires WHERE questionnaire_id = ?', [id]);
    };

};
