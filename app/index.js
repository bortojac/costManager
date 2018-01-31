const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');


const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);

//app.use(express.static('public'));
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.get('/', function (req, res) {
    //console.log(__dirname);
    //console.log(path);
    //console.log(req);
    res.sendFile(path.join(__dirname, '../public/index.html'))
    //res.sendFile(path.join(__dirname, '../public/reset.css'));
});

app.listen(3000, () => console.log('Server is running'));

