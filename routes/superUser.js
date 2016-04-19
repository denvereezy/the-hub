exports.showRequests = function(req, res, next) {
  req.getServices()
  .then(function(connection){
  const superUserDataService = services.superUserDataService(connection);
  })
  .catch(function(err){
    next(err);
  });
};
