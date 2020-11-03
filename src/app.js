const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('express-handlebars');

const sessionMiddleware = require('./middlewares/session');

const app = express();

app.engine('.hbs', hbs({ extname: '.hbs' }));
app.set('views', `${process.cwd()}/views`);
app.set('view engine', '.hbs');
console.log(process.cwd());

app.use(sessionMiddleware());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routeHandler = (req, res, next) => {
  console.log(req.headers);
  if (req.headers['authorization']) {
    req.session['store_id'] = req.headers['authorization'];
  }
  req.session['test_key'] = 'myKeyIsCool2';
  // res.render('home', { msg: 'session added' });
  next();
};
const sessionHandler = (req, res) => {
  res.send(req.session || null);
};
const testHandler = (req, res) => {
  res.send(req.session || null);
};

app.get('/', routeHandler);
app.get('/session', routeHandler, sessionHandler);
app.get('/test', testHandler);
app.listen(process.env.PORT);
