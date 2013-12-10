var icecast = require("icecast");
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

var server = BinaryServer({port: 9000});
var clients = []; 

server.on('connection', function(client){   
  //var file = fs.createReadStream(__dirname + '/flower.png');
  //client.send(file); 
  clients.push(client);
});

var url = 'http://icecast.omroep.nl/3fm-bb-mp3'
icecast.get(url, function(res) {
  res.on('data', function(data) {	
    //decoder.write(data); // consider the decoder instance from the first example
	console.log("Sending data to "+clients.length+" clients");
	clients.forEach(function(client) {
		client.send(data, {binary: true, mask: false});
	});
  });
  res.on('metadata', function(metadata) {
  console.log(metadata);
    //var track = icecast.parse(metadata).StreamTitle;
    //publishToClients(track); // use your pub/sub lib of choice (I use Juggernaut) to publish tracks to all connected clients
  });
});

//var stream = client.createStream();
//file.pipe(stream);