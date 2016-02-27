const Promise = require("bluebird");
const QueryService = require("../data_services/query-service");
const bcrypt = require('bcrypt');

module.exports = function(connection){
    const queryService  = new QueryService(connection);

    this.signup = function(data){
        return new Promise(function(resolve,reject){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(data.Password, salt, function(err, hash) {
                    if (err){
                        return console.log(err);
                    }
                    data.Password = hash;
                    connection.query('insert into user set ?', data, function(err, results) {
                        if (err) return reject (err);
                        resolve(results);
                    });
                });
            });
        });
    };

    this.login = function(email){
        return queryService.executeQuery('SELECT * from user WHERE email=?', [email]);
    };
};
