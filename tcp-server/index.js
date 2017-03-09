var net = require('net');
const os = require('os');
const readline = require('readline');
const ansi = require('ansi')
, cursor = ansi(process.stdout)

var spin = [ "|","/","-","\\" ];
var spin_idx = 0;

//var HOST = '127.0.0.1';
// var HOST = '10.120.22.78';//'192.168.1.2';//KDA
var HOST = '192.168.1.9';
var PORT = 6969;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);



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



var sock = net.createServer();//(socket) => {
//   socket.end('goodbye\n');
// }).on('error', (err) => {
//   // handle errors here
//   throw err;
// });

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
// var server = net.createServer(function(sock) {
//
//     // We have a connection - a socket object is assigned to the connection automatically
//     console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
//
//     // Add a 'data' event handler to this instance of socket
//     sock.on('data', function(data) {
//
//         parse_packet(data);
//         //console.log(os.uptime() + sock.remoteAddress + ': ' + data);
//         //console.log(os.uptime() + ': ' + data + '\n');
//         // Write the data back to the socket, the client will receive it as data from the server
//         //sock.write('You said "' + data + '"');
//         sock.write(spin[spin_idx]);
//         spin_idx++;
//         if(spin_idx > 3){spin_idx = 0;}
//
//     });
//
//     // Add a 'close' event handler to this instance of socket
//     sock.on('close', function(data) {
//         console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
//     });
//
// })//.listen(PORT, HOST);

//console.log('Server listening on ' + HOST +':'+ PORT);

sock.on('data', function(data) {

        parse_packet(data);
        sock.write(spin[spin_idx]);
        spin_idx++;
        if(spin_idx > 3){spin_idx = 0;}

});

// TODO: error handler for when particle closes connection
function tidy(){
  sock.close();
}

process.on('uncaughtException', function(e){
  // tidy up
  tidy();
})

process.on('SIGTERM', function(e){
  // also tidy
  tidy();
})

process.on('SIGINT', function(e){
  // and again
  tidy();
})

process.stdin.on('keypress', (str,key)=>{
  if(str == ' '){
    if(sock.listening){
      sock.close();
      console.log('Closing...');
    }else{
      sock.listen(PORT,HOST);
      console.log('listening on ' + HOST +':'+ PORT)
    }
  }
  //console.log("s" + str)
  //console.log("k" + key)
})
