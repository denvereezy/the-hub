const QueryService = require('../data_services/query-service');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

var encryptPassword = function(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash)
            });
        });
    });
};

module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.showEntityUsers = function(entity_id, email) {
        return queryService.executeQuery('select * from user where entity_id = ? and email != ?', [entity_id, email]);
    };

    this.deleteUser = function(id) {
        return queryService.executeQuery('delete from user where id = ?', id);
    };

    this.checkToken = function(token) {
      return queryService.executeQuery('select * from user where token = ?', token);
    };

    this.confirmAccount = function(user, token, matchPassword) {
      var password = matchPassword;
        return encryptPassword(password)
            .then(function(encryptedPassword) {
                user[0].password = encryptedPassword;
                user[0].status = 'active';
                var data = user[0];
                return queryService.executeQuery('update user set ? where token = ?', [data, token]);
            });
    };

};
