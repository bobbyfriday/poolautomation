var status = "off";
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var MISTERS = new Gpio(13, 'out'); //use GPIO pin 4, and specify that it is output

exports.on = function(socket){
  console.log("misters on")
  status="on";
  MISTERS.writeSync(1);
  socket.emit("misters",{ status: "ON"});
};

exports.off = function(socket){
  console.log("misters off")
  status="off";
  MISTERS.writeSync(0);
  socket.emit("misters",{ status: "OFF"});
};

exports.status = function(socket){
  var gpio_status = MISTERS.readSync();
  console.log("MISTERS = " + gpio_status);
  if(gpio_status)
    socket.emit("misters",{ status: "ON"});
  else
    socket.emit("misters",{ status: "OFF"});
};
