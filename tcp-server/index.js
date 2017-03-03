var net = require('net');
const os = require('os');

var spin = [ "|","/","-","\\" ];
var spin_idx = 0;

//var HOST = '127.0.0.1';
var HOST = '10.120.22.78';//'192.168.1.2';
var PORT = 6969;

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

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {

        parse_packet(data);
        //console.log(os.uptime() + sock.remoteAddress + ': ' + data);
        //console.log(os.uptime() + ': ' + data + '\n');
        // Write the data back to the socket, the client will receive it as data from the server
        //sock.write('You said "' + data + '"');
        sock.write(spin[spin_idx]);
        spin_idx++;
        if(spin_idx > 3){spin_idx = 0;}

    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
