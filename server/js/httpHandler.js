const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');


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
 // console.log('request: ', req);
  console.log('request: ', req.url);

  if (req.method === 'GET' ) {
    if (req.url === 'background.jpg') {
      fs.readFile('background.jpg', (err, data) => {
        if (err) {
          console.log('ERROR: ', err);
          res.writeHead(404, headers);
          res.end();
          next();
        } else {
          console.log('Success: ', data);
           res.writeHead(200, headers);
           res.end(data);
           next();
        }
      })


    } else {
      res.writeHead(200, headers);
    var directionRandom = randomDirection();
    console.log('messages**', messageQueue)
    var direction = messageQueue.dequeue() || randomDirection();
    console.log('direction' , direction)
    res.end(direction);
    next();
    }

  } else {
    res.writeHead(200, headers);
    res.end();
    next();
  }
  // invoke next() at the end of a request to help with testing!
};

// module.exports.randomDirection = randomDirection;
