var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)  => {
    res.redirect('/index.html');
});

app.get('/test', (req, res)  => {
    res.redirect('/tests/test.html');
});

app.listen(app.get('port'), function() {
    console.log('Port: ', app.get('port'));
});