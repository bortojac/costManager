var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Expenses = require('./model/expenses');
var Users = require('./model/users');
var _ = require('lodash');
//set our port to either a predetermined port number if it is set up, or 3000
//var port = process.env.API_PORT || 3000;

// db config
mongoose.connect('mongodb://jtest:!7janlk2iah@ds221148.mlab.com:21148/costmanager');

var app = express();
var config = require('../webpack.config.js');
var compiler = webpack(config);

//app.use(express.static('public'));

//now we should configure the API to use bodyParser and look for JSON data in the request body
// if extended: false, we cannot post nested objects. let's allow that for now and see what we need
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
   });


app.get('/', function (req, res) {
    //console.log(__dirname);
    //console.log(path);
    //console.log(req);
    res.sendFile(path.join(__dirname, '../public/index.html'))
    //res.sendFile(path.join(__dirname, '../public/reset.css'));
});

// handle routes to Expense database

app.get('/expenseBase', function (req, res) {
    Expenses.find()
    .sort({date: -1})
    .exec(function(err, expenses) {
        if (err) res.send(err);
        res.json(expenses)
    })
});

app.post('/expenseBase', function(req, res) {
    
    // create new expense document
    var expense = new Expenses();
    var date = new Date(req.body.date);
    // body parser lets us use the req.body
    var month = date.getMonth();
    var day = date.getDate();
    expense.date = date;
    expense.year = date.getFullYear();
    expense.month = month;
    expense.day = day;
    expense.category = req.body.category;
    expense.amount = req.body.amount;
    //console.log(req.body.notes);
    expense.notes = req.body.notes;

    // create monthStartInterval from the users selected monthStartDay
    var userMonthStartDay = req.body.monthStartDay;

    day >= userMonthStartDay ? (
        expense.monthStartInterval = `${month}/${userMonthStartDay} - ${month+1}/${userMonthStartDay-1}`
    ) :
    (
        expense.monthStartInterval = `${month-1}/${userMonthStartDay} - ${month}/${userMonthStartDay-1}`
    )

    // save
    expense.save(function(err) {
        if (err) res.send(err);
        res.send(`${req.body.amount} expense with date: ${req.body.date} and category: ${req.body.category} successfully saved to the database`);
    });
});

app.delete('/expenseBase', function(req, res) {
    
    Expenses.remove(
        {
            /*date: req.body.date,
            category: req.body.category,
            amount: req.body.amount,
            notes: req.body.notes*/
           }, 
           function(err) {
               if(err) res.send(err);
               console.log('every entry has been deleted');
               res.send('Every entry has been deleted');
               //res.send(`Entry with date: ${req.body.date} and category: ${req.body.category} has been deleted`);
           }
        )
});

// handle get requests for categoryGraph
app.get('/expenseBase/categoryGraph', function (req, res) {
    //console.log('in here');
        Expenses.aggregate([
            { $group: { _id: '$category', amount: { $sum: '$amount' }}},
            { $project: { _id: 0, amount: 1, category: "$_id"}}],
            function (err, _res) {
              if (err) return handleError(err);
              res.json(_res);
            });
});

// handle get requests for monthlyGraph
app.get('/expenseBase/monthlyGraph', function (req, res) {
    Expenses.aggregate(
        [
            {
                $group: {
                    _id: { monthStartInterval: '$monthStartInterval', year: '$year', month: '$month' },
                    amount: { $sum: '$amount' }
                }
            },
            {
                $project: {
                    _id: 0,
                    amount: 1,
                    month: '$_id.month',
                    year: '$_id.year',
                    monthStartInterval: '$_id.monthStartInterval'
                }
            },
            {
                $sort: {
                    'year': 1,
                    'month': 1
                }
            }
        ],
        function (err, _res) {
            if (err) return handleError(err);
            res.json(_res);
        });

});

app.put('/expenseBase/newCategories', function (req, res) {
    // property is the old category and req[property] is the new one
    for (var property in req.body.newCategories) {
        //console.log(property);
        var query = { category: property };
        //console.log(query);
        //console.log(req.body.newCategories[property]);
        Expenses.update(query, {$set: {category: req.body.newCategories[property]}}, {multi: true}).exec();
    }
    });

    // handle routes to the user database

    app.get('/userBase/:userId', function (req, res) {
        //Users.findOne({ userId: req.params.userId }, function (err, user) {
        //    res.json(user);
        //})
        Users.findOne({ userId: req.params.userId })
    .exec(function(err, users) {
        if (err) res.send(err);
        res.json(users)
    })
    });

    app.post('/userBase/:userId', function (req, res) {
     // create new expense document
    var user = new Users();
    // body parser lets us use the req.body
    user.userId = req.params.userId;
    user.monthStartDay = req.body.monthStartDay;

    // save
    user.save(function(err) {
        if (err) res.send(err)
        res.send(`${req.params.userId} user has now chosen a month start date of ${req.body.monthStartDay}`);
    });
});

app.put('/userBase/:userId/monthStartDay', function (req, res) {
    var query = { userId: req.params.userId };
    Users.findOneAndUpdate(query, { $set: { monthStartDay: req.body.monthStartDay } }, function(err, result) {
        res.send(`${req.params.userId} now has a month start date of ${result.monthStartDay}`);
    } );
    //Users.update(query, { $set: { monthStartDay: req.body.monthStartDay } }).exec();
});

app.delete('/userBase/:userId', function (req, res) {

    Users.remove(
        {
        },
        function (err) {
            if (err) res.send(err);
            console.log('every entry has been deleted');
            res.send('Every entry has been deleted');
            //res.send(`Entry with date: ${req.body.date} and category: ${req.body.category} has been deleted`);
        }
    );
});

app.listen(3000, () => console.log('Server is running'));
