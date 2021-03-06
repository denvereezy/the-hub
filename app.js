const express      = require('express'),
      exhbs        = require('express-handlebars'),
      cookieParser = require('cookie-parser'),
      session      = require('express-session'),
      bodyParser   = require('body-parser'),
      mysql        = require('mysql'),
      connectionPv = require('connection-provider'),
      compression  = require('compression'),
      flash        = require('express-flash'),
      app          = express();

const SignupDataService                 = require('./data_services/signupDataService');
const SetupQuestionnaireDataService     = require('./data_services/setupQuestionnaireDataService');
const LoginDataService                  = require('./data_services/loginDataService');
const ViewQuestionnnaireDataService     = require('./data_services/viewQuestionnaireDataService');
const QuestionDataService               = require('./data_services/questionDataService');
const AllocateQuestionnaireDataService  = require('./data_services/allocateQuestionnaireDataService');
const AnswerDataService                 = require('./data_services/answerDataService');
const RollupDataService                 = require('./data_services/rollupDataService');
const UserDataService                   = require('./data_services/userDataService');
const SuperUserDataService              = require('./data_services/superUserDataService');

const signup               = require('./routes/signup');
const setupQuestionnaire   = require('./routes/setupQuestionnaire');
const login                = require('./routes/login');
const viewQuestionnaire    = require('./routes/viewQuestionnaire');
const answerQuestionnaire  = require('./routes/answerQuestions');
const questions            = require('./routes/questions');
const allocate             = require('./routes/allocateQuestionnaire');
const router               = require('./routes/router');
const rollup               = require('./routes/rolledUpData');
const users                = require('./routes/users');
const superUser            = require('./routes/superUser');
const forgotPassword       = require('./routes/forgotPassword');

const dbOptions = {
  host      : 'localhost',
  user      : 'admin',
  password  : 'password',
  port      : 3306,
  database  : 'the_hub'
};

const serviceSetupCallBack = function (connection) {
  return {
    signupDataService                 : new SignupDataService(connection),
    setupQuestionnaireDataService     : new SetupQuestionnaireDataService(connection),
    loginDataService                  : new LoginDataService(connection),
    viewQuestionnnaireDataService     : new ViewQuestionnnaireDataService(connection),
    questionDataService               : new QuestionDataService(connection),
    allocateQuestionnaireDataService  : new AllocateQuestionnaireDataService(connection),
    answerDataService                 : new AnswerDataService(connection),
    rollupDataService                 : new RollupDataService(connection),
    userDataService                   : new UserDataService(connection),
    superUserDataService              : new SuperUserDataService(connection)
  }
};

app.use(connectionPv(dbOptions, serviceSetupCallBack));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret : 'keyboard cat', cookie :{ maxAge : 3600000 }, resave : true, saveUninitialized : true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(compression());
app.use(flash());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');


app.get('/signup', router.signup);
app.post('/signup/add', signup.add);
app.get('/message',router.message);
app.get('/', router.login);
app.post('/login', login.userLogin);
app.get('/account/verifyaccount/:token', router.verifyaccount);
app.post('/user/confirm/:token',users.confirmUser);
app.get('/forgot/password', router.forgotPassword);
app.post('/forgot/password', forgotPassword.forgotPassword);
app.get('/reset/:token', router.resetPassword);
app.post('/user/password/reset/:token',forgotPassword.updateUserAccount);
app.use(login.userCheck);
app.get('/questionnaire/setup/step1', login.userCheck, router.questionnaire);
app.post('/questionnaire/setup/step1/', login.userCheck, setupQuestionnaire.create);
app.get('/questionnaire/setup/step2/:id', login.userCheck, setupQuestionnaire.show);
app.post('/questionnaire/setup/step2/:id', login.userCheck, setupQuestionnaire.linkMetricToQuestionnaire);
app.post('/setup-questionnaire-step-2/addMetricToMetricTable/:id', login.userCheck, setupQuestionnaire.addMetricToMetricTable);
app.get('/questionnaire/allocate/:id', login.userCheck, allocate.show);
app.post('/questionnaire/allocate/down/:questionnaire_id', login.userCheck, allocate.allocateToSubEntity);
app.post('/view-questionnaire/create', login.userCheck, setupQuestionnaire.create);
app.post('/questionnaire/allocate/:id', login.userCheck, allocate.allocate);
app.get('/dashboard', login.userCheck, viewQuestionnaire.show);
app.get('/questionnaire/questions/view/:id', login.userCheck, questions.show);
app.get('/questionnaire/:id/questions/:base_questionnaire_id/results', login.userCheck, questions.metricResults);
app.get('/questionnaire/:questionnaire_id/questions/results', login.userCheck, questions.donorMetricResults);
app.get('/questionnaire/questions/:questionnaire_id', login.userCheck, answerQuestionnaire.showQuestions);
app.post('/questionnaire/questions/view/:questionnaire_id', login.userCheck, setupQuestionnaire.linkMetricToQuestionnaire);
app.post('/questionnaire/facilitatorQuestions/link/:questionnaire_id', login.userCheck, questions.linkFacilitatorMetricsToQuestionnaire);
app.post('/questionnaire/:questionnaire_id/answer/:questionnaire_metric_id', login.userCheck, answerQuestionnaire.answers);
app.post('/questionnaire/:base_questionnaire_id/rolledup-answers',login.userCheck, answerQuestionnaire.releaseAnswersToDonor);
app.post('/questionnaire/submit/answered/:questionnaire_id', login.userCheck, answerQuestionnaire.answeredQuestionnaire);
app.get('/questionnaire/:questionnaire_id', login.userCheck, allocate.showCreatedQuestionnaire);
app.get('/questionnaire/question/:metric_id/edit', login.userCheck, questions.edit);
app.post('/questionnaire/question/update/:metric_id', login.userCheck, questions.update);
app.post('/questionnaire/questions/add/:questionnaire_id', login.userCheck, allocate.addMetricForSubEntity);
app.get('/users', login.userCheck, users.showUsers);
app.post('/users/add', login.userCheck, users.addUser);
app.get('/users/delete/:id', login.userCheck, users.delete);
app.get('/logout', router.logout);

app.use(login.checkSuperUser);
app.get('/root',login.checkSuperUser, superUser.showRequests);
app.post('/users/request/verify/:user_id/:firstname/:email',login.checkSuperUser, superUser.handleRequest);

const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
