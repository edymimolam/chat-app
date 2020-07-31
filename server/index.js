var app = require('express')();
var http = require('http').createServer(app);


app.get('/', (req, res) => {
  res.send('hello there');
});


http.listen(3210, () => {
  console.log('listening on *:3210');
});