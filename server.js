var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', function (req,res) {
    res.sendFile('/index.html');
});

app.use('/store', function (req, res, next) {
   console.log('You are going to store');
   next();
});

app.get('/store', function (req, res) {
    res.sendFile('store.html', {root: 'assets'});
});


app.use(function (req, res, next) {
    res.status(404).sendFile('error404.html', {root: 'assets'});
});

var server = app.listen(8080, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Apka działa na na http://' + host + ':' + port);
});