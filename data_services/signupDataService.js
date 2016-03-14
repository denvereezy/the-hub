const QueryService = require("../data_services/query-service");
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

  this.addEntity = function(entity) {
    return queryService.executeQuery('insert into entity set ?', entity);
  };

  this.addUser = function(user) {
    return encryptPassword(user.password)
      .then(function(encryptedPassword) {
        user.password = encryptedPassword;
        return queryService.executeQuery('insert into user set ?', user);
      });
  };
};
