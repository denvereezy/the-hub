const QueryService = require("../data_services/query-service");
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

module.exports = function(connection){
  const queryService = new QueryService(connection);

    this.addEntity = function(entity){
      return queryService.executeQuery('insert into entity set ?', entity);
    };

    this.addUser = function(user){
        return new Promise(function(resolve,reject){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err){
                        return console.log(err);
                    }
                    user.password = hash;
                    queryService.executeQuery('insert into user set ?', user, function(err, results) {
                        if (err) return reject (err);
                        resolve(results);
                    });
                });
            });
        });
    };

};
