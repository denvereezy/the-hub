const QueryService = require("../data_services/query-service");

module.exports = function(connection){
  const queryService = new QueryService(connection);

    this.questions = function(){
        return queryService.executeQuery('select question_id, question_description from questionnaire_questions');
    };

    this.addQuestion = function(data){
        return queryService.executeQuery('insert into questionnaire_questions set ?', data);
    };

    this.questionnaire = function(){
        return queryService.executeQuery('select questionnaire_id, DATE_FORMAT(due_date,"%d %b %y") as due_date, questionnaire_name from questionnaire_questions');
    };

    this.editQuestion = function(id){
        return queryService.executeQuery('SELECT * FROM questionnaire_questions WHERE question_id = ?', [id]);
    };

    this.updateQuestion = function(data,id){
        return queryService.executeQuery('UPDATE questionnaire_questions SET ? WHERE question_id = ?', [data, id]);
    };

    this.deleteQuestion = function(id){
        return queryService.executeQuery('DELETE FROM questionnaire_questions WHERE questionnaire_id = ?', [id]);
    };

    this.maxId = function(){
      return queryService.executeQuery('select max(questionnaire_id) as questionnaire_id from questionnaires');
    };
};
