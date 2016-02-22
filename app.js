//Dependences
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
      //jquery       = require('jquery'),
      app          = express();

//Data Services
const SignupDataService = require('./data_services/signupDataService.js');
const SetupQuestionnaireDataService = require('./data_services/setupQuestionnaireDataService.js');
const LoginDataService = require('./data_services/loginDataService');
const ViewQuestionnnaireDataService = require('./data_services/viewQuestionnaireDataService');

//Routes
const signup = require('./routes/signup');
const setupQuestionnaire = require('./routes/setupQuestionnaire');
const login = require('./routes/login');
const viewQuestionnaire = require('./routes/viewQuestionnaire');

// Connection to mySql
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
    setupQuestionnaireDataService : new SetupQuestionnaireDataService(connection),
    loginDataService : new LoginDataService(connection),
    viewQuestionnnaireDataService : new ViewQuestionnnaireDataService(connection)
  }
};

//Middleware
app.use(connectionPv(dbOptions, serviceSetupCallBack));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret : 'keyboard cat', cookie :{ maxAge : 3600000 }, resave : true, saveUninitialized : true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(compression());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

//when URL routes
app.get('/', function (req, res) {
  res.render('login');
});

app.get('/dashboard', function(req, res){
  res.render('dashboard');
});


app.get('/signup', function (req, res) {
  res.render('signup');
});

app.get('/questionnaire/setup/step1', function (req, res) {
  res.render('setup-questionnaire-step-1');
});

app.get('/view-questionnaire', viewQuestionnaire.show);

//Route Actions
//Signup
app.post('/signup/add',signup.add);
 // app.get('/signup',questions.show);
// app.get('/setup-questionnaire/edit/:question_id',questions.get);

app.post('/login', login.userLogin);
//Setup Questionnaire
app.post('/questionnaire/setup/step1/', setupQuestionnaire.create);
app.get('/questionnaire/setup/step2/:id', setupQuestionnaire.show);
app.post('/questionnaire/setup/step2/:id', setupQuestionnaire.linkMetricToQuestionnaire);

app.post('/setup-questionnaire-step-2/addMetricToMetricTable', setupQuestionnaire.addMetricToMetricTable);
// app.get('/setup-questionnaire/delete/:question_id',questions.delete);
// app.post('/setup-questionnaire/update/:question_id',questions.update);

app.post('/setup-questionnaire-step-3/send', setupQuestionnaire.sendQuestionnaire);
//View Questionnaire
app.post('/view-questionnaire/create', setupQuestionnaire.create);

app.get('/logout', function(req, res){
     delete req.session.user
     res.redirect("/");
});
//Launch app config
//type to start: nodemon app.js
const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
