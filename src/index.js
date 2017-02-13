// Created by snov on 23.06.2016.

import IO from 'socket.io';

// list of events for connected sockets
const events = {};

const addFuncToObject = (target, id, func) => {
  target[id] = {
    func: func
  };
};

export default function({ http, middlewares } = {}) {
  return (osnova) => {
    http = http || osnova.http;

    const _io = new IO(http);

    Object.keys(middlewares).forEach((key, i) => {
      _io.use(middlewares[key]);
    });

    _io.on('connection', socket => {
      Object.keys(events).forEach((curr, i) => {
        socket.on(curr, events[curr].func);
      });
    });

    const publicInterface = {

      native() {
        return _io;
      },

      on(id, func) {
        addFuncToObject(events, id, func);
      }
    };

    osnova.next({ io: publicInterface });
  }
}