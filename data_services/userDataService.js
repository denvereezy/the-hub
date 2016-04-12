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

  this.showEntityUsers = function(entity_id, user) {
    return queryService.executeQuery('select * from user where entity_id = ? and email != ?', [entity_id, user]);
  };

  this.deleteUser = function(id) {
    return queryService.executeQuery('delete from user where id = ?', id);
  };

  this.confirmAccount = function(user, token) {
    return encryptPassword(user.password)
      .then(function(encryptedPassword) {
        user.password = encryptedPassword;
        return queryService.executeQuery('update user set ? where token = ?', [user, token]);
      });
  };

  this.checkEmailAvailablity = function() {
    return queryService.executeQuery('select email from user');
  };

};
