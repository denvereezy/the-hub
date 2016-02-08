const QueryService = require("../data_services/query-service");

module.exports = function(connection){
  const queryService = new QueryService(connection);

    this.questions = function(){
        return queryService.executeQuery('select * from ');
    };

    this.addQuestion = function(data){
        return queryService.executeQuery('insert into  set ?', data);
    };

    this.editQuestion = function(id){
        return queryService.executeQuery('SELECT * FROM  WHERE id = ?', [id]);
    };

    this.updateQuestion = function(data,id){
        return queryService.executeQuery('UPDATE  SET ? WHERE id = ?', [data, id]);
    };

    this.deleteQuestion = function(Id){
        return queryService.executeQuery('DELETE FROM  WHERE id = ?', [d]);
    };

};
