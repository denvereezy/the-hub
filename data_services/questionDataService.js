const QueryService = require("../data_services/query-service");

module.exports = function(connection){
  const queryService = new QueryService(connection);

    this.questions = function(){
        return queryService.executeQuery('select * from questionnaire_questions');
    };

    this.addQuestion = function(data){
        return queryService.executeQuery('insert into questionnaire_questions set ?', data);
    };

    this.editQuestion = function(id){
        return queryService.executeQuery('SELECT * FROM questionnaire_questions WHERE question_id = ?', [id]);
    };

    this.updateQuestion = function(data,id){
        return queryService.executeQuery('UPDATE questionnaire_questions SET ? WHERE question_id = ?', [data, id]);
    };

    this.deleteQuestion = function(id){
        return queryService.executeQuery('DELETE FROM questionnaire_questions WHERE question_id = ?', [id]);
    };

};
