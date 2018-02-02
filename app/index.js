const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Expense = require('./model/expenses');
//set our port to either a predetermined port number if it is set up, or 3000
//const port = process.env.API_PORT || 3000;

// db config
mongoose.connect('mongodb://jtest:!7janlk2iah@ds221148.mlab.com:21148/costmanager');

const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);

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

// test to return all expenses in the database
app.get('/expenseBase', function (req, res) {
    Expense.find(function(err, expenses) {
        if (err) res.send(err);
        res.json(expenses)
    })
});

app.post('/expenseBase', function(req, res) {
    
    // create new expense document
    var expense = new Expense();
    
    // body parser lets us use the req.body
    expense.date = req.body.date;
    expense.category = req.body.category;
    expense.amount = req.body.amount;
    expense.notes = req.body.notes;

    // save
    expense.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Expense successfully saved to the database'});
    });
});

app.listen(3000, () => console.log('Server is running'));


