var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/user', function (req, res) {
    res.render('user', {
        user:
            {
                name: 'Johny X',
                password: '12345'
            },
        user_name: req.query.name,
        user_pwd: req.query.password
    });
});

app.listen(3000);
app.use(function (res, req, next) {
    res.status(404).send('404 ERROR. Page NOT found.');
});