var net = require('net');
const readline = require('readline');


var HOST = '10.120.101.97';//'192.168.1.2';//KDA
//var HOST = '192.168.1.9';
var PORT = 7000;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var client = new net.Socket();
client.setEncoding('utf8');
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    client.write('I am Chuck Norris!\n');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // Close the client socket completely
    //client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

process.stdin.on('keypress', (str,key)=>{

var cmd;

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
  if(cmd != ""){ client.write(cmd); }
})
