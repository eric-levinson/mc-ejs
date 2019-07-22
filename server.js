// server.js
// load the things we need
var express = require('express');
var app = express();
request = require('request-json');
var client = request.createClient('https://api.mcsrvstat.us/2/yeets-retreat.ddns.net');

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page



var response = {
  motd: { raw: [ 'big bois only' ] },
  players: { online: 1, max: 40, list: [ 'No Players' ] },
  mods: {
    names: ['minecraft', 'modname2'],
    raw: { '0': 'minecraft 1.12.2' }
  }
}

app.get('/', function(req, res) {



  var po = response.players.online
  var pm = response.players.max
  var mn = response.mods.names
  var motd = response.motd.raw

  client.get('', function(err, res, data) {
    response = data;
  });

  var online = po.toString();
  var max = pm.toString();
  var modCount = mn.length;

  res.render('pages/index', {

    online: online,
    max: max,
    modCount: modCount,
    motd: motd

  });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.get('/details', function(req, res) {


  var playerList = response.players.list
  var modNames = response.mods.names

  client.get('', function(err, res, data) {
    response = data;
  });



  res.render('pages/details', {

    playerList: playerList,
    modNames: modNames

  });
});

app.use(express.static("public"));

app.listen(8080);
console.log('8080 is the magic port');
