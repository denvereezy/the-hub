
const assert = require('assert');
const mysql = require('mysql');

const SignupDataService                 = require('./data_services/signupDataService');
const SetupQuestionnaireDataService     = require('./data_services/setupQuestionnaireDataService');
const LoginDataService                  = require('./data_services/loginDataService');
const ViewQuestionnnaireDataService     = require('./data_services/viewQuestionnaireDataService');
const QuestionDataService               = require('./data_services/questionDataService');
const AllocateQuestionnaireDataService  = require('./data_services/allocateQuestionnaireDataService');
const AnswerDataService                 = require('./data_services/answerDataService');
const RollupDataService                 = require('./data_services/rollupDataService');
const UserDataService                   = require('./data_services/userDataService');
const SuperUserDataService              = require('./data_services/superUSerDataService');
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'password',
        database: 'the_hub'
    });

connection.connect();

connection.on('error', function() {
//    console.log(arguments)
});

const signupDataService                 = new SignupDataService(connection),
      setupQuestionnaireDataService     = new SetupQuestionnaireDataService(connection),
      loginDataService                  = new LoginDataService(connection),
      viewQuestionnnaireDataService     = new ViewQuestionnnaireDataService(connection),
      questionDataService               = new QuestionDataService(connection),
      allocateQuestionnaireDataService  = new AllocateQuestionnaireDataService(connection),
      answerDataService                 = new AnswerDataService(connection),
      rollupDataService                 = new RollupDataService(connection),
      userDataService                   = new UserDataService(connection),
      superUserDataService              = new SuperUserDataService(connection)

describe('testing findifity', function(){
    it('should return a list of questionnaires ', function(done){
          viewQuestionnnaireDataService.showQuestionnaires(1)
          .then(function(results){
          console.log(results);
            assert(results);
            done();
            })
    });

  //
  //   it('should return product sales searched', function(done){
  //        var resultsCb = function(results){
  //           var ifExists = _.any(results, { 'Name': 'Gold Dish Vegetable Curry Can'});
	// console.log(ifExists);
  //           assert(ifExists);
  //           done();
  //       };
  //
  //       queries.findGroupedSales('go')
  //           .then(resultsCb)
  //           .catch(function(err){
  //               next(err);
  //       });
  //   });
  //
  //   it('should return category searched', function(done){
  //       var resultsCb = function(results){
  //           var ifExists = _.any(results, {'Name': 'Beverages'});
  //           assert(ifExists);
  //           done();
  //       };
  //
  //       queries.categories('be')
  //           .then(resultsCb)
  //           .catch(function(err){
  //               next(err);
  //       });
  //   });
  //
  //   it('should return supplier searched', function(done){
  //       var resultsCb = function(results){
  //           var ifExists = _.any(results, {'Name': 'HomeMade'});
  //           assert(ifExists);
  //           done();
  //       };
  //       queries.suppliers('o')
  //           .then(resultsCb)
  //           .catch(function(err){
  //               next(err);
  //       });
  //   });
  //
  //   it('should return purchase searched', function(done){
  //       var resultsCb = function(results){
  //           var ifExists = _.any(results, {'Name': 'Chakalaka Can'});
  //           assert(ifExists);
  //           done();
  //       };
  //       queries.purchases('a')
  //           .then(resultsCb)
  //           .catch(function(err){
  //               next(err);
  //       });
  //   });
  //
  //   it('should return the most popular product', function(done){
  //       var resultsCb = function(results){
  //           var ifExists = _.any(results, {'Name': 'Gold Dish Vegetable Curry Can'});
  //           assert(ifExists);
  //           done();
  //       };
  //       spaza.popularProduct()
  //           .then(resultsCb)
  //           .catch(function(err){
  //           next(err);
  //       });
  //   });
  //
  //   it('should return the most popular category', function(done){
  //       var resultsCb = function(results){
  //           assert('Can Food');
  //           done();
  //       };
  //       spaza.popularCategory()
  //           .then(resultsCb)
  //           .catch(function(err){
  //               next(err);
  //       });
  //   });
  //
  //   it('should return the least popular category', function(done){
  //       var resultsCb = function(results){
  //           assert('ascac');
  //           done();
  //       };
  //       spaza.leastPopularCat()
  //           .then(resultsCb)
  //           .catch(function(err){
  //               next(err);
  //       });
  //   });
});
