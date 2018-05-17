var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var stringifyFile;

app.use(bodyParser.json());

app.get('/getNote', function (req, res) {
    fs.readFile('./test.json', 'utf8', function (err, data) {
        if (err) throw err;
        stringifyFile = JSON.parse(data);
        res.send(data);
        app.post('/updateNote/:note', function (req, res) {
            stringifyFile['note'] = req.params.note;
            fs.writeFile('./test.json',JSON.stringify(stringifyFile),function (err) {
                if (err) throw err;
                console.log('file updated');
            });
        });
    })
});




app.listen(3000);

