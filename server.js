var http = require("http");
var server = http.createServer(respondToClient);
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyATH0", {
  baudrate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
}, false);

// start the server listening on port 8080
// when you go to your browser if you are on a local network the type "yunName.local:8080"
// From another network type: "your.external.ip.address:8080" Replace "your.external.ip.address" by the external ip address 
// of the network to which the yun is connected.
// NOTE: Remember to forward the port 8080 on your router to the internal ip of the yun
server.listen(8080); 

global.recData = "";

// let the user know you started:
console.log('Server is listening on port 8080');

serialPort.on("open", function () {
      serialPort.on('data', function(data) {
        global.recData = data.toString();
        //console.log(recData);
      });
    });

    serialPort.on('error', function(err) {
      console.log('error: '+err);
    });

    serialPort.open();

// this is the callback function that's called
// whenever a client makes a request:
function respondToClient(request, response) {  
	  console.log("request from: ");
	  console.log(request.connection.remoteAddress);
    ///////////////////////////////
   	// write back to the client: //
    ///////////////////////////////
   	response.writeHead(200, {"Content-Type": "text/html"});
   	response.write("<h1>Hello, " + request.connection.remoteAddress+"</h1>");
    response.write("<p>Simple nodejs server listening for serial data comming from arduino</p>");
    response.write("<p>Created by: fito_segrera</p>");
    response.write("<p>Incomming data from arduino: "+global.recData+"</p>");
    response.write("<button onClick=\"sendData()\">clickMe</button>");
    response.write("<script>function sendData(){console.log(\"clicked!!\");document.getElementById(\"text\").innerHTML = \"Hello World!\";}setInterval(function(){location.reload();},3000);</script>");
    response.write("<p id=\"text\"></p>");
   	response.end();
   	///////////////////////////////
    ///////////////////////////////
  };