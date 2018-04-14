# poolautomation
start of a pool automation project.  Raspberry PI, node js and whatever else

# Parts
(1) Raspberry Pi 2 Model B //its what I had laying around
(1) PiTFT 2.8" TFT 320x240 + Capacitive Touchscreen for Raspberry Pi https://www.adafruit.com/product/2423
(1) Pi Model B+ / Pi 2 / Pi 3 - Case Base and Faceplate Pack - Clear - for 2.8" PiTFT https://www.adafruit.com/product/3062

# setup
//install node
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb

//install socket.io
npm install socket.io  

# GPIO positions
GPIO #1 Landscape Lights
GPIO #2 Pool Lights
GPIO #3 Misters

GPIO #17 PiTFT Button
GPIO #22 PiTFT Button
GPIO #23 PiTFT Button
GPIO #27 PiTFT Button
GPIO #24 PiTFT Touchscreen
GPIO #25 PiTFT Touchscreen
