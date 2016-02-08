const express      = require('express'),
      exhbs        = require('express-handlebars'),
      cookieParser = require('cookie-parser'),
      session      = require('express-session'),
      bodyParser   = require('body-parser'),
      mysql        = require('mysql'),
      connectionPv = require('connection-provider'),
      app          = express();

const dbOptions = {
  host      : 'localhost',
  user      : 'admin',
  password  : 'password',
  port      : 3306,
  database  : 'impact_app'
};

const serviceSetupCallBack = function (connection) {
  return {
    //
  }
};

app.use(connectionPv(dbOptions, serviceSetupCallBack));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret : 'keyboard cat', cookie :{ maxAge : 3600000 }, resave : true, saveUninitialized : true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('index');
});

const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
