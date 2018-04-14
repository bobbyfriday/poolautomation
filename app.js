var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var url = require('url')
var fs = require('fs')
var landscape_lights = require('./components/landscape_lights')
var pool_lights = require('./components/pool_lights')
var misters = require('./components/misters')
var waterfall = require('./components/waterfall')
var Mouse = require("node-mouse");
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var BACKLIGHT = new Gpio(18, 'out'); //use GPIO pin 4, and specify that it is output
var backlight_timer;
var m = new Mouse();
var ui_lock = true;

m.on("mousedown",function(event) {
    console.log(event);
    //turnon backlight
    BACKLIGHT.writeSync(1);
    ui_lock = false;
    //set timeout to turn it off after 30 seconds
    clearTimeout(backlight_timer);
    backlight_timer = setTimeout(function(){
      ui_lock = true;
      BACKLIGHT.writeSync(0);
    },30000);
});

// Web Socket Connection
io.sockets.on('connection', function (socket) {

  // If we recieved a command from a client to start watering lets do so
  socket.on('pool_lights_on', function (data) {
    console.log("calling pool_lights.on(socket)")
    pool_lights.on(socket)
  });
  socket.on('pool_lights_off', function (data) {
    console.log("calling pool_lights.off(socket)")
    pool_lights.off(socket)
  });

  socket.on('landscape_lights_on', function (data) {
    landscape_lights.on(socket)
  });
  socket.on('landscape_lights_off', function (data) {
    landscape_lights.off(socket)
  });

  socket.on('misters_on', function (data) {
    misters.on(socket)
  });
  socket.on('misters_off', function (data) {
    misters.off(socket)
  });

  socket.on('waterfall_on', function (data) {
    waterfall.on(socket)
  });
  socket.on('waterfall_off', function (data) {
    waterfall.off(socket)
  });

    setInterval(function(){
    console.log("Status Update");
     landscape_lights.status(socket);
     pool_lights.status(socket);
     misters.status(socket);
     waterfall.status(socket);
   }, 3000);
});

//This will open a server at localhost:5000. Navigate to this in your browser.
app.listen(8080);

// Http handler function
function handler (req, res) {

    // Using URL to parse the requested URL
    var path = url.parse(req.url).pathname;

    // Managing the root route
    if (path == '/') {
        index = fs.readFile(__dirname+'/public/index.html',
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load index.html");
                }

                res.writeHead(200,{'Content-Type': 'text/html'});
                res.end(data);
            });
    // Managing the route for the javascript files
    } else if( /\.(js)$/.test(path) ) {
        index = fs.readFile(__dirname+'/public'+path,
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load " + path);
                }

                res.writeHead(200,{'Content-Type': 'text/plain'});
                res.end(data);
            });
    } else {
        res.writeHead(404);
        res.end("Error: 404 - File not found.");
    }

}
