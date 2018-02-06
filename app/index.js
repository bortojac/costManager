var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Expenses = require('./model/expenses');
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
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

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

// handle routes to database

app.get('/expenseBase', function (req, res) {
    Expenses.find(function(err, expenses) {
        if (err) res.send(err);
        res.json(expenses)
    })
});

app.post('/expenseBase', function(req, res) {
    
    // create new expense document
    var expense = new Expenses();
    var date = new Date(req.body.date);
    // body parser lets us use the req.body
    expense.date = date;
    expense.year = date.getFullYear();
    expense.month = date.getMonth();
    expense.day = date.getDay();
    expense.category = req.body.category;
    expense.amount = req.body.amount;
    expense.notes = req.body.notes;

    // save
    expense.save(function(err) {
        if (err) res.send(err);
        res.send(`${req.body.amount} expense with date: ${req.body.date} and category: ${req.body.category} successfully saved to the database`);
    });
});

app.delete('/expenseBase', function(req, res) {
    
    Expenses.remove(
        {
            date: req.body.date,
            category: req.body.category,
            amount: req.body.amount,
            notes: req.body.notes
           }, 
           function(err) {
               if(err) res.send(err);
               res.send(`Entry with date: ${req.body.date} and category: ${req.body.category} has been deleted`);
           }
        )
})

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
})

// handle get requests for monthlyGraph
app.get('/expenseBase/monthlyGraph', function (req, res) {
    Expenses.aggregate([
        { $group: { _id: '$month', amount: { $sum: '$amount' }}},
        { $project: { _id: 0, amount: 1, month: "$_id"}}],
        function (err, _res) {
          if (err) return handleError(err);
          res.json(_res);
        }); 

})

app.listen(3000, () => console.log('Server is running'));


