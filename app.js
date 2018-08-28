var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/hello-gif', function(req, res) {
    var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
    res.render('hello-gif', {gifUrl: gifUrl})
});

app.get('/greetings/:name', function(req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name})
});

app.get('/', function(req, res) {
    console.log(req.query.term)
    giphy.search(req.query.term, function(err, response) {
        res.render('home', {gifs: response.data})
    });

    /* HTTP GET version

    // save the query in a variable
    var queryString = req.query.term;
    // clean the query up and remove whitespace and restricted characters
    var term = encodeURIComponent(queryString);
    // put the search term in the giphy API url
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

    //do the thing
    http.get(url, function(response) {
        // set response encoding to UTF-8, please
        response.setEncoding('UTF-8');

        var body = '';

        response.on('data', function(d) {
            // continuously stream giphy data into the body
            body += d;
        });

        response.on('end', function() {
            // when we've got all the data, parse it into JSON
            var parsed = JSON.parse(body);
            // render the home template and pass the gif data into the template
            res.render('home', {gifs: parsed.data})
        });
    });
    */
});

app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});
