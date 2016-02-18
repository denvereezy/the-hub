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

const SignupDataService = require('./data_services/signupDataService.js');
const SetupQuestionnaireDataService = require('./data_services/setupQuestionnaireDataService.js');

const signup = require('./routes/signup.js');
const setupQuestionnaire = require('./routes/setupQuestionnaire.js');

const dbOptions = {
  host      : 'localhost',
  user      : 'admin',
  password  : 'password',
  port      : 3306,
  database  : 'the_hub'
};

const serviceSetupCallBack = function (connection) {
  return {
    signupDataService : new SignupDataService(connection),
    setupQuestionnaireDataService : new SetupQuestionnaireDataService(connection)
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

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.get('/setup-questionnaire', function (req, res) {
  res.render('setup-questionnaire-step-1');
});

app.get('/setup-questionnaire-step-2', function (req, res) {
  res.render('setup-questionnaire-step-2');
});

// app.get('/signup',questions.show);
// app.get('/setup-questionnaire/edit/:question_id',questions.get);
app.post('/signup/add',signup.add);
app.post('/setup-questionnaire-step-1/create', setupQuestionnaire.create);
app.get('/setup-questionnaire-step-2/show', setupQuestionnaire.show);
// app.get('/setup-questionnaire/delete/:question_id',questions.delete);
// app.post('/setup-questionnaire/update/:question_id',questions.update);


const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
