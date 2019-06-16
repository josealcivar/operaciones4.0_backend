require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
bodyParser = require('body-parser');

require("./cors")(app);

app.use(bodyParser.json());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var loginRouter = require('./routes/login');
var rolesRouter = require('./routes/rol');
var personasRouter = require('./routes/personas');
var empresasRouter = require('./routes/empresas');
var departamentosRouter = require('./routes/departamentos');




app.use('/api', indexRouter);

app.use('/api/users', usersRouter);

app.use('/api/personas',personasRouter);
app.use('/api/login', loginRouter);

app.use('/api/roles', rolesRouter);
app.use('/api/empresas',empresasRouter);
app.use('/api/departamentos',departamentosRouter);



app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
