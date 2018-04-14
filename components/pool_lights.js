var status = "off";
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var POOL_LIGHTS = new Gpio(5, 'out'); //use GPIO pin 4, and specify that it is output

exports.on = function(socket){
  console.log("pool_lights on")
  status="on";
  POOL_LIGHTS.writeSync(1);
  socket.emit("pool_lights",{ status: "ON"});
};

exports.off = function(socket){
  console.log("pool_lights off")
  status="off";
  POOL_LIGHTS.writeSync(0);
  socket.emit("pool_lights",{ status: "OFF"});
};


exports.status = function(socket){
  var gpio_status = POOL_LIGHTS.readSync();
  console.log("POOL_LIGHTS = " + gpio_status);
  if(gpio_status)
    socket.emit("pool_lights",{ status: "ON"});
  else
    socket.emit("pool_lights",{ status: "OFF"});
};
