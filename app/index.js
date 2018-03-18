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

//load creds from dotenv if in dev mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//set our port to either a predetermined port number if it is set up, or 3000
var port = process.env.API_PORT || 3000;

var app = express();

// db config
var dbUser = process.env.DB_USER;
var dbPwd = process.env.DB_PWD;
var dbHost = process.env.DB_HOST;
var db = 'mongodb://' + dbUser + ':' + dbPwd + '@' + dbHost + '/costmanager';
mongoose.connect(db);

// if in dev mode, use webpack.dev.js compiler
if (process.env.NODE_ENV !== 'production') {
    var config = require('../webpack.dev.js');
    var compiler = webpack(config);
}

//user bodyParser to look for json request
// if extended: false, we cannot post nested objects. let's allow that for now and see what we need
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// if in dev mode, use webpackDevMiddleware and webpackHotMiddleware
if (process.env.NODE_ENV !== 'production') {
    app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler))
} else {
    app.use(express.static('public'))
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/settings', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

// #### EXPENSE COLLECTION ROUTES ####

app.get('/expenseBase/:userId', function (req, res) {
    Expenses.find({ userId: req.params.userId })
        .sort({ date: -1 })
        .exec(function (err, expenses) {
            if (err) res.send(err);
            res.json(expenses)
        })
});

app.post('/expenseBase/:userId', function (req, res) {

    // create new expense document
    var expense = new Expenses();
    var date = new Date(req.body.date);
    var month = date.getMonth();
    var day = date.getDate();
    expense.date = date;
    expense.year = date.getFullYear();
    expense.month = month;
    expense.day = day;
    expense.category = req.body.category;
    expense.amount = req.body.amount;
    expense.notes = req.body.notes;
    expense.userId = req.params.userId;

    // save
    expense.save(function (err) {
        if (err) res.send(err);
        res.send(`${req.body.amount} expense with date: ${req.body.date} and category: ${req.body.category} successfully saved to the database`);
    });
});

app.delete('/expenseBase/:userId/deleteAll', function (req, res) {
    Expenses.remove(
        {
            userId: req.params.userId
        },
        function (err) {
            if (err) res.send(err);
            res.send('Every entry has been deleted');
        }
    )
});

app.delete('/expenseBase/:userId/deleteEntries', function (req, res) {
    var date = req.body.date;
    var category = req.body.category;
    var amount = req.body.amount;
    var notes = req.body.notes;
    Expenses.remove(
        {
            userId: req.params.userId,
            date: date,
            category: category,
            amount: amount,
            notes: notes
        },
        function (err) {
            if (err) res.send(err);
            res.send('the entry with date: ' + date + 'category: ' + category + 'amount: ' + amount + 'notes: ' + notes + 'has been deleted');
        }
    )
})

// handle get requests for categoryGraph
app.get('/expenseBase/:userId/categoryGraph', function (req, res) {
    Expenses.aggregate([
        { $match: { userId: req.params.userId } },
        { $group: { _id: '$category', amount: { $sum: '$amount' } } },
        { $project: { _id: 0, amount: 1, category: "$_id" } }],
        function (err, _res) {
            if (err) res.send(err);
            res.json(_res);
        });
});

// handle post requests for monthlyGraph
app.post('/expenseBase/:userId/monthlyGraph/', function (req, res) {

    // create monthStartInterval from the users selected monthStartDay, then group by it and aggregate
    var userMonthStartDay = req.body.monthStartDay;
    Expenses.aggregate(
        [
            { $match: { userId: req.params.userId } },
            {
                $project:
                    {
                        monthStartInterval:
                            {
                                $switch:
                                    {
                                        branches: [
                                            {
                                                case: { $eq: [userMonthStartDay, 1] },
                                                then: {
                                                    $concat: [
                                                        { $substrBytes: ['$month', 0, -1] },
                                                        '/',
                                                        { $substrBytes: [userMonthStartDay, 0, -1] },
                                                        '-',
                                                        { $substrBytes: ['$month', 0, -1] },
                                                        '/',
                                                        {
                                                            $substrBytes: [
                                                                {
                                                                    $switch: {
                                                                        branches: [
                                                                            {
                                                                                case: { $in: ['$month', [0, 2, 4, 6, 7, 9, 11]] },
                                                                                then: 31
                                                                            },
                                                                            {
                                                                                case: { $eq: ['$month', 1] },
                                                                                then: 28
                                                                            },
                                                                            {
                                                                                case: { $in: ['$month', [3, 5, 8, 10]] },
                                                                                then: 30
                                                                            },
                                                                        ],
                                                                        default: 'Did not match'
                                                                    }
                                                                }, 0, -1]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                case: { $and: [{ $eq: ['$month', 0] }, { $lt: ['$day', userMonthStartDay] }] },
                                                then: {
                                                    $concat: [
                                                        '11',
                                                        '/',
                                                        { $substrBytes: [userMonthStartDay, 0, -1] },
                                                        '-',
                                                        '0',
                                                        '/',
                                                        { $substrBytes: [{ $subtract: [userMonthStartDay, 1] }, 0, -1] }
                                                    ]
                                                }
                                            },
                                            {
                                                case: { $and: [{ $eq: ['$month', 11] }, { $gte: ['$day', userMonthStartDay] }] },
                                                then: {
                                                    $concat: [
                                                        '11',
                                                        '/',
                                                        { $substrBytes: [userMonthStartDay, 0, -1] },
                                                        '-',
                                                        '0',
                                                        '/',
                                                        { $substrBytes: [{ $subtract: [userMonthStartDay, 1] }, 0, -1] }
                                                    ]
                                                }
                                            },
                                            {
                                                case: { $gte: ['$day', userMonthStartDay] },
                                                then: {
                                                    $concat: [
                                                        { $substrBytes: ['$month', 0, -1] },
                                                        '/',
                                                        { $substrBytes: [userMonthStartDay, 0, -1] },
                                                        '-',
                                                        { $substrBytes: [{ $add: ['$month', 1] }, 0, -1] },
                                                        '/',
                                                        { $substrBytes: [{ $subtract: [userMonthStartDay, 1] }, 0, -1] }
                                                    ]
                                                }
                                            },
                                            {
                                                case: { $lt: ['$day', userMonthStartDay] },
                                                then: {
                                                    $concat: [
                                                        { $substrBytes: [{ $subtract: ['$month', 1] }, 0, -1] },
                                                        '/',
                                                        { $substrBytes: [userMonthStartDay, 0, -1] },
                                                        '-',
                                                        { $substrBytes: [{ $add: '$month' }, 0, -1] },
                                                        '/',
                                                        { $substrBytes: [{ $subtract: [userMonthStartDay, 1] }, 0, -1] }
                                                    ]
                                                }
                                            }
                                        ],
                                        default: 'did not match'
                                    }
                            },
                        year: '$year',
                        month: '$month',
                        day: '$day',
                        amount: '$amount'
                    }
            },
            {
                $group: {
                    _id: { monthStartInterval: '$monthStartInterval', year: '$year', month: '$month', day: '$day' },
                    amount: { $sum: '$amount' }
                }
            },
            {
                $project: {
                    _id: 0,
                    amount: 1,
                    day: '$_id.day',
                    month: '$_id.month',
                    year: '$_id.year',
                    monthStartInterval: '$_id.monthStartInterval'
                }
            },
            {
                $sort: {
                    'year': 1,
                    'month': 1,
                    'day': 1

                }
            }
        ],
        function (err, _res) {
            if (err) res.send(err);
            res.json(_res);
        });
});

app.put('/expenseBase/:userId/newCategories', function (req, res) {
    // property is the old category and req[property] is the new one
    for (var property in req.body.newCategories) {
        var query = {
            category: property,
            userId: req.params.userId
        };
        Expenses.update(query, { $set: { category: req.body.newCategories[property] } }, { multi: true }).exec();
    }
});

// #### USER COLLECTION ROUTES ####

app.get('/userBase/:userId', function (req, res) {
    Users.findOne({ userId: req.params.userId })
        .exec(function (err, user) {
            if (err) res.send(err);
            res.json(user)
        })
});

app.post('/userBase/:userId', function (req, res) {

    // create new expense document
    var user = new Users();
    user.userId = req.params.userId;
    user.monthStartDay = req.body.monthStartDay;
    user.categories = req.body.categories;

    // save
    user.save(function (err) {
        if (err) res.send(err)
        res.send(`${req.params.userId} has now chosen a month start date of ${req.body.monthStartDay} and has categories ${req.body.categories}`);
    });
});

app.put('/userBase/:userId/monthStartDay', function (req, res) {
    var query = { userId: req.params.userId };
    Users.findOneAndUpdate(query, { $set: { monthStartDay: req.body.monthStartDay } }, function (err, result) {
        res.send(`${req.params.userId} now has a month start date of ${result.monthStartDay}`);
    });
});

app.put('/userBase/:userId/addCategory', function (req, res) {
    var query = { userId: req.params.userId };
    Users.findOneAndUpdate(query, { $push: { categories: req.body.category } }, function (err, result) {
        res.send(`${req.params.userId} has added ${req.body.category} to their categories`);
    });
});

app.put('/userBase/:userId/categories', function (req, res) {
    // property is the old category and req[property] is the new one
    Users.findOne({ userId: req.params.userId })
        .exec(function (err, user) {
            // reset the categories if the request is empty
            if (req.body.newCategories.length == 0) {
                Users.update(query, { $set: { categories: [] } }).exec(function (err, _res) {

                    if (err) {
                        res.send(err);
                    }
                    res.json(user);
                });

            } else {
                // update categories if request contains categories
                var userCategories = user.categories;
                for (var property in req.body.newCategories) {
                    userCategories[userCategories.indexOf(property)] = req.body.newCategories[property];
                }
                var query = { userId: req.params.userId };
                Users.update(query, { $set: { categories: userCategories } }).exec(function (err, _res) {

                    if (err) {
                        res.send(err);
                    }
                    res.json(user);
                });
            }
        })
});

app.delete('/userBase/:userId/deleteCategory', function (req, res) {
    Users.findOne({ userId: req.params.userId })
        .exec(function (err, user) {
            var userCategories = user.categories;
            var catIndex = userCategories.indexOf(req.body.category);
            var query = { userId: req.params.userId };

            // delete the category at the index of catIndex
            userCategories.splice(catIndex, 1)

            Users.update(query, { $set: { categories: userCategories } }).exec();
            Expenses.remove({
                userId: req.params.userId,
                category: req.body.category
            }, function (err) {
                if (err) res.send(err);
                res.send('category' + req.body.category + 'has been removed');
            })
        })
})

app.delete('/userBase/:userId', function (req, res) {
    Users.remove(
        {
            userId: req.params.userId
        },
        function (err) {
            if (err) res.send(err);
            res.send('Every entry has been deleted');
        }
    );
});

app.listen(port, () => console.log('Server is running'));