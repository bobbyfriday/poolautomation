var status = "off";
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var PUMP = new Gpio(12, 'out'); //use GPIO pin 4, and specify that it is output
var ACTUATOR_RIGHT = new Gpio(16, 'out');
var ACTUATOR_LEFT = new Gpio(21, 'out');

exports.on = function(socket){
  console.log("waterfall working...")
  status="on";

  ACTUATOR_RIGHT.writeSync(1);

  setTimeout(function(){
    console.log("waterfall on")
    ACTUATOR_RIGHT.writeSync(0);
    PUMP.writeSync(1);
      socket.emit("waterfall",{ status: "ON"});
  },5000);

  socket.emit("waterfall",{ status: "Working..."});
};

exports.off = function(socket){
  console.log("waterfall working...")
  status="on";

  ACTUATOR_LEFT.writeSync(1);

  setTimeout(function(){
    console.log("waterfall off")
    ACTUATOR_LEFT.writeSync(0);
    PUMP.writeSync(0);
      socket.emit("waterfall",{ status: "OFF"});
  },5000);

  socket.emit("waterfall",{ status: "Working..."});
};


exports.status = function(socket){
  var gpio_status_pump = PUMP.readSync();
  var gpio_status_left = ACTUATOR_LEFT.readSync();
  var gpio_status_right = ACTUATOR_RIGHT.readSync();

  console.log("PUMP = " + gpio_status_pump);
  if(gpio_status_pump)
  {
    socket.emit("waterfall",{ status: "ON"});
  }
  else if (gpio_status_left || gpio_status_right) {
    socket.emit("waterfall",{ status: "Working..."});
  }
  else{
    socket.emit("waterfall",{ status: "OFF"});
  }
};
