const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('express-handlebars');

const sessionMiddleware = require('./middlewares');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');

app.use(sessionMiddleware());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routeHandler = (req, res) => {
  req.session.key = 'myKeyIsCool';
  res.render('index', { msg: 'session added' });
};
const sessionHandler = (req, res) => {
  res.send(req.session || null);
};

app.get('/', routeHandler);
app.get('/session', sessionHandler);
