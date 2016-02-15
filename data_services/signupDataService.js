const Promise = require("bluebird");
const QueryService = require("../data_services/query-service");
const bcrypt = require('bcrypt');

module.exports = function(connection){
    var queryService  = new QueryService(connection);

    this.signup = function(data){
        return new Promise(function(resolve,reject){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(data.password, salt, function(err, hash) {
                    if (err){
                        return console.log(err);
                    }
                    data.password = hash;
                    connection.query('insert into users set ?', data, function(err, results) {
                        if (err) return reject (err);
                        resolve(results);
                    });
                });
            });
        });
    };

    this.login = function(username){
        return queryService.executeQuery('SELECT * from Users WHERE Username=?', [username]);
    };
};
