var socket = io('http://192.168.1.35:8080');

socket.on('landscape_lights', function (data) {
    console.log("lanscape lights data = " + data);
    var pool_lights_status = document.getElementById('landscape_lights_status');
    landscape_lights_status.innerText = data.status;
    if(data.status == "ON")
    {
      document.getElementById('landscape_lights_on').style.visibility = 'hidden';
      document.getElementById('landscape_lights_off').style.visibility = 'visible';
    }
    else {
      document.getElementById('landscape_lights_off').style.visibility = 'hidden';
      document.getElementById('landscape_lights_on').style.visibility = 'visible';
    }

});

socket.on('pool_lights', function (data) {
    console.log("pool lights data = " + data);
    var pool_lights_status = document.getElementById('pool_lights_status');
    pool_lights_status.innerText = data.status;
    if(data.status == "ON")
    {
      document.getElementById('pool_lights_on').style.visibility = 'hidden';
      document.getElementById('pool_lights_off').style.visibility = 'visible';
    }
    else {
      document.getElementById('pool_lights_off').style.visibility = 'hidden';
      document.getElementById('pool_lights_on').style.visibility = 'visible';
    }
});

socket.on('misters', function (data) {
    console.log("misters data = " + data);
    var pool_lights_status = document.getElementById('misters_status');
    pool_lights_status.innerText = data.status;
    if(data.status == "ON")
    {
      document.getElementById('misters_on').style.visibility = 'hidden';
      document.getElementById('misters_off').style.visibility = 'visible';
    }
    else {
      document.getElementById('misters_off').style.visibility = 'hidden';
      document.getElementById('misters_on').style.visibility = 'visible';
    }
});

socket.on('waterfall', function (data) {
    console.log("waterfall data = " + data);
    var pool_lights_status = document.getElementById('waterfall_status');
    waterfall_status.innerText = data.status;
    if(data.status == "ON")
    {
      document.getElementById('waterfall_on').style.visibility = 'hidden';
      document.getElementById('waterfall_off').style.visibility = 'visible';
    }
    else if (data.status == "OFF") {
      document.getElementById('waterfall_on').style.visibility = 'visible';
      document.getElementById('waterfall_off').style.visibility = 'hidden';
    }
    else {
      document.getElementById('waterfall_on').style.visibility = 'hidden';
      document.getElementById('waterfall_off').style.visibility = 'hidden';
    }
});

window.addEventListener("load", function(){

  var landscape_lights_on = document.getElementById('landscape_lights_on');
  landscape_lights_on.style.visibility = 'hidden';

  var landscape_lights_off = document.getElementById('landscape_lights_off');
  landscape_lights_off.style.visibility = 'hidden';

  var pool_lights_on = document.getElementById('pool_lights_on');
  pool_lights_on.style.visibility = 'hidden';

  var pool_lights_off = document.getElementById('pool_lights_off');
  pool_lights_off.style.visibility = 'hidden';

  var misters_on = document.getElementById('misters_on');
  misters_on.style.visibility = 'hidden';

  var misters_off = document.getElementById('misters_off');
  misters_off.style.visibility = 'hidden';

  var waterfall_on = document.getElementById('waterfall_on');
  waterfall_on.style.visibility = 'hidden';

  var waterfall_off = document.getElementById('waterfall_off');
  waterfall_off.style.visibility = 'hidden';

  landscape_lights_on.addEventListener('click', function() {
      console.log("landscape_lights_on");
      socket.emit('landscape_lights_on');
  });

  landscape_lights_off.addEventListener('click', function() {
      console.log("landscape_lights_off");
      socket.emit('landscape_lights_off');
  });

  pool_lights_on.addEventListener('click', function() {
      console.log("pool_lights_on");
      socket.emit('pool_lights_on');
  });

  pool_lights_off.addEventListener('click', function() {
      console.log("pool_lights_off");
      socket.emit('pool_lights_off');
  });

  misters_on.addEventListener('click', function() {
      console.log("misters_on");
      socket.emit('misters_on');
  });

  misters_off.addEventListener('click', function() {
      console.log("misters_off");
      socket.emit('misters_off');
  });

  waterfall_on.addEventListener('click', function() {
      console.log("waterfall_on");
      socket.emit('waterfall_on');
  });

  waterfall_off.addEventListener('click', function() {
      console.log("waterfall_off");
      socket.emit('waterfall_off');
  });
});
