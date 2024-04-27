const { EventEmitter, emitter } = require('events');

const eventEmitter = new EventEmitter();

// Set the maximum listeners limit to 1000
eventEmitter.setMaxListeners(1000);  

// Add listeners to the event emitter
eventEmitter.on('event_name', (event) => {
  // Your event handling logic here
});