import express = require('express');
// import path = require('path');
import bodyParser = require('body-parser');

import routes from './routes/index';
import users from './routes/user';
import blogs from './routes/blog';

var sql = require('mssql');

var config = {
    user: 'anurag',
    password: 'Gandhi12',
    server: 'ANURAG-TI10598', // You can use 'localhost\\instance' to connect to named instance 
    database: 'Company',

    options: {
        encrypt: false // Use this if you're on Windows Azure 
    }
}
sql.connect(config).then(function () {
    console.log('Connected to Sql server.');
}).catch(function (err) {
    console.log(err);
});

var app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    // add your logic allow multiple domains.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/api/blogs', blogs);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: 'No API found for the request url.',
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: 'No API found for the request url.',
        error: {}
    });
});


module.exports = app;
