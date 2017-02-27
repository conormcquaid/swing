var express = require('express')
var app = express()
var my_port = 8080;

var post_index = 0;

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended:true} ) );

app.use(function(req,res,next){
  req.connection.setNoDelay(true);
  next();
});

app.get('/', function (req, res) {
  res.send('Hello Swingers!');
  console.log("Homepage request");
})

app.post('/', function(req,res){

  var x_value = req.body.x_value;
  var y_value = req.body.y_value;
  var z_value = req.body.z_value;
  console.log("%d, %s, %s, %s", post_index, x_value, y_value, z_value);
  res.send("Hello POST");
  post_index++;
})

var server = app.listen(my_port, function () {
  var host = server.address().address
  var port = server.address().port
  var family = server.address().family
  console.log("Example app listening on port %s : %s %s !", host, port, family)


})
