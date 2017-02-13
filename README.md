# Osnova Socket.IO module

## bI?

Basic socket.io wrapper exported as osnova module.

## Install

    npm i osnova-module-socket.io
    
## Usage

```javascript
import OSNOVA from 'osnova';
import socketIoModule from 'osnova-module-socket.io';

const osnova = OSNOVA({
  modules: [ socketIoModule(/* optional options object */) ],
  
  /* rest OSNOVA config */

});

```

Takes optional `opts` object as a parameter with properties:
- **http** { object } extern http server, if `undefined` will be used `osnova.http`.
- **middlewares** { array } - native Socket.IO middlewares list.

Exports to osnova `io` object with interface:
- `native()` { function } return inner socket.io object.
- `on(eventName, callback)` { function } - add an event for connected sockets. 
Callback will 
be called with `(socket, payload)` parameters when socket 
triggers an event.

### Passing Socket.IO middlewares

Middlewares should have signature `osnova => middleware`. 

```javascript
const myMiddleware = (osnova) => (socket, next) => {
 console.log(`Hey, i have access to OSNOVA version ${osnova.__version} here!`);
 next();
}
```