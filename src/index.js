// Created by snov on 23.06.2016.

import IO from 'socket.io';

// list of events for connected sockets
const events = {};

export default function({ http } = {}) {
  return (osnova) => {
    http = http || osnova.http;

    const _io = new IO(http);

    _io.on('connection', socket => {
      Object.keys(events).forEach((curr, i) => {
        socket.on(curr, events[curr].func);
      });
    });

    const addFuncToObject = (target, id, func) => {
      target[id] = {
        func: func
      };
    };

    osnova.next({
      io: {
        native() { return _io; },
        on(id, func) {
          addFuncToObject(events, id, func);
        }
      }
    });
  }
}