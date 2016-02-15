// Dependencies
const express      = require('express'),
      exhbs        = require('express-handlebars'),
      cookieParser = require('cookie-parser'),
      session      = require('express-session'),
      bodyParser   = require('body-parser'),
      mysql        = require('mysql'),
      connectionPv = require('connection-provider'),
      compression  = require('compression'),
      app          = express();

//Data Services - SQL statements (functions)
const QuestionnaireDataService  = require('./data_services/questionnaireDataService');
const QuestionDataService       = require('./data_services/questionDataService');
const InvitationDataService     = require('./data_services/invitationDataService');
const SignupDataService         = require('./data_services/signupDataService');


//routes
const questionnaire   = require('./routes/setup_questionnaire.js');
const questions       = require('./routes/setup_questions.js');
const invitations     = require('./routes/setup_invitations.js');
const signup          = require('./routes/signup.js');

const dbOptions = {
  host      : 'localhost',
  user      : 'admin',
  password  : 'password',
  port      : 3306,
  database  : 'impact_app'
};

const serviceSetupCallBack = function (connection) {
  return {
    questionnaireDataService : new QuestionnaireDataService(connection),
    questionDataService : new QuestionDataService(connection),
    invitationDataService : new InvitationDataService(connection)
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

app.get('/dashboard', function (req, res) {
  res.render('dashboard');
});

app.get('/setup-questionnaire-step-2', function (req, res) {
  res.render('setup-questionnaire-step-2');
});

app.get('/setup-questionnaire-step-1',questionnaire.show);
app.get('/setup-questionnaire/edit/:question_id',questionnaire.get);
app.post('/setup-questionnaire/add',questionnaire.add);
app.get('/setup-questionnaire/delete/:questionnaire_id',questionnaire.delete);
app.post('/setup-questionnaire/update/:questionnaire_id',questionnaire.update);

app.get('/setup-questionnaire-step-2/show', questions.show);
// app.get('/setup-questionnaire-step-2', questions.add);
app.post('/setup-questionnaire-step-2/add', questions.add);
app.get('/setup-questionnaire-step-2/next', questions.next);


app.get('/setup-questionnaire-step-3/show', invitations.show);
app.post('/setup-questionnaire-step-3/add', invitations.add);

const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
