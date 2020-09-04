const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
// const validMessages = require('./keypressHandler');

var validMessages = ['left', 'right', 'up', 'down'];
var randomDirection = () => {
  let randomIndex = Math.floor(Math.random() * 4);
  return validMessages[randomIndex]

}

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    res.writeHead(200, headers);
    //res.send() or res.json()
    //res.end('left');
    var direction = randomDirection();
    res.end(direction);
    next();
  } else {
    res.writeHead(200, headers);
    //res.send() or res.json()
    res.end();
    next();
  }
  // invoke next() at the end of a request to help with testing!
};

module.exports.randomDirection = randomDirection;
