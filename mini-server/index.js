var express = require('express')
var app = express()
var my_port = 8080;

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended:true} ) );

app.get('/', function (req, res) {
  res.send('Hello Swingers!');
  console.log("Homepage request");
})

app.post('/', function(req,res){

  var my_val = req.body.value;
  console.log("POST: %s", my_val);
  res.send("Hello POST");

})

var server = app.listen(my_port, function () {
  var host = server.address().address
  var port = server.address().port
  var family = server.address().family
  console.log("Example app listening on port %s : %s %s !", host, port, family)


})
