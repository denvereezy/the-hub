const express      = require('express'),
      exhbs        = require('express-handlebars'),
      cookieParser = require('cookie-parser'),
      session      = require('express-session'),
      bodyParser   = require('body-parser'),
      mysql        = require('mysql'),
      connectionPv = require('connection-provider'),
      compression  = require('compression'),
      uuid         = require('node-uuid'),
      lodash       = require('lodash'),
      app          = express();

const SignupDataService                 = require('./data_services/signupDataService');
const SetupQuestionnaireDataService     = require('./data_services/setupQuestionnaireDataService');
const LoginDataService                  = require('./data_services/loginDataService');
const ViewQuestionnnaireDataService     = require('./data_services/viewQuestionnaireDataService');
const QuestionDataService               = require('./data_services/questionDataService');
const AllocateQuestionnaireDataService  = require('./data_services/allocateQuestionnaireDataService');

const signup             = require('./routes/signup');
const setupQuestionnaire = require('./routes/setupQuestionnaire');
const login              = require('./routes/login');
const viewQuestionnaire  = require('./routes/viewQuestionnaire');
const questions          = require('./routes/questions');
const allocate           = require('./routes/allocateQuestionnaire');

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
    allocateQuestionnaireDataService  : new AllocateQuestionnaireDataService(connection)
  }
};

app.use(connectionPv(dbOptions, serviceSetupCallBack));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret : 'keyboard cat', cookie :{ maxAge : 3600000 }, resave : true, saveUninitialized : true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(compression());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.get('/signup', function (req, res) {
  res.render('signup');
});
app.post('/signup/add',signup.add);

app.get('/', function (req, res) {
  res.render('login');
});

app.post('/login', login.userLogin);

app.get('/dashboard', function(req, res){
  res.render('dashboard');
});

app.get('/questionnaire/setup/step1', function (req, res) {
  res.render('setup-questionnaire-step-1');
});

app.post('/questionnaire/setup/step2/:id', setupQuestionnaire.linkMetricToQuestionnaire);
app.post('/setup-questionnaire-step-2/addMetricToMetricTable/:id', setupQuestionnaire.addMetricToMetricTable);

app.get('/questionnaire/allocate/:id', allocate.show);
app.post('/questionnaire/allocate/down/:id',allocate.allocateToSubEntity);
app.post('/view-questionnaire/create', setupQuestionnaire.create);
app.post('/questionnaire/allocate/:id',allocate.allocate);
app.get('/view-questionnaire', viewQuestionnaire.show);
app.get('/questionnaire/questions/view/:id',questions.show);
app.post('/questionnaire/questions/view/:id',setupQuestionnaire.linkMetricToQuestionnaire)

app.get('/logout', function(req, res){
     delete req.session.user
     res.redirect("/");
});

const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
