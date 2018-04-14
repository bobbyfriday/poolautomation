var status = "off";
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LANDSCAPE_LIGHTS = new Gpio(6, 'out'); //use GPIO pin 4, and specify that it is output

exports.on = function(socket){
  console.log("landscape_lights on")
  status="on";
  LANDSCAPE_LIGHTS.writeSync(1);
  socket.emit("landscape_lights",{ status: "ON"});
};

exports.off = function(socket){
  console.log("landscape_lights off")
  status="off";
  LANDSCAPE_LIGHTS.writeSync(0);
  socket.emit("landscape_lights",{ status: "OFF"});
};

exports.status = function(socket){
  var gpio_status = LANDSCAPE_LIGHTS.readSync();
  console.log("LANDSCAPE_LIGHTS = " + gpio_status);
  if(gpio_status)
    socket.emit("landscape_lights",{ status: "ON"});
  else
    socket.emit("landscape_lights",{ status: "OFF"});
};
