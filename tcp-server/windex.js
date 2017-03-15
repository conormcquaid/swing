var net = require('net');
const os = require('os');
const readline = require('readline');
const ansi = require('ansi')
, cursor = ansi(process.stdout)

var spin = [ "|","/","-","\\" ];
var spin_idx = 0;

//var HOST = '127.0.0.1';
 var HOST = '10.120.22.78';//'192.168.1.2';//KDA
//var HOST = '192.168.1.9';
var PORT = 6969;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

//////////////////////////////////////////////////////////////////////////////
function parse_packet( data ){
  var packets = data.toString().split('|');
  for(var i = 0; i < packets.length; i++){
    //console.log(packets[i] + "    ");
    var nums = packets[i].split(':');
    if(nums.length == 5){
      //correct format
      if(nums[4] = nums[0] + nums[1] + nums[2] + nums[3]){
        //chscksum passed
        console.log(os.uptime() + "," + nums[0] + "," + nums[1] + "," + nums[2] + "," + nums[3] );
      }
    }
  }
}
/////////////////////////////////////////////////////////////////////////////

var cmd="";

var server = net.createServer();
server.on('connection', handleConnection);

server.listen(PORT, HOST, function() {
  console.log('server listening to %j', server.address());
});

function handleConnection(conn) {
  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
  console.log('new client connection from %s', remoteAddress);

  conn.on('data', onConnData);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);

  function onConnData(d) {
    parse_packet(d);
    if(cmd.length != 0){
      conn.write(cmd);
      cmd = "";
    }
  }

  function onConnClose() {
    console.log('connection from %s closed', remoteAddress);
  }

  function onConnError(err) {
    console.log('Connection %s error: %s', remoteAddress, err.message);
  }
}

process.stdin.on('keypress', (str,key)=>{

  if(str == 'g'){
    cmd = "G\n";
  }
  if(str == 's'){
    cmd = "S\n";
  }
  if(str == '1'){
    cmd = "P1000\n";
  }
  if(str == '2'){
    cmd = "P1500\n";
  }
  if(str == '3'){
    cmd = "P2000\n";
  }
  if(str == 'a'){
    cmd = "L0,255,0,0\n";
  }
  if(str == 'b'){
    cmd = "L1,0,66,0\n";
  }
  if(str == 'c'){
    cmd = "L2,0,44,0\n";
  }
  if(str == 'd'){
    cmd = "L3,0,55,0\n";
  }

})
