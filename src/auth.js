// Created by snov on 13.02.2017.
//
// Authentication middleware
//
//=========================================================================

const passportSocketIo = require('passport.socketio');

export default function auth(io, opts = {}) {
  const { cookieParser, key, secret, store } = opts;

  io.use(passportSocketIo.authorize({
    cookieParser, key, secret, store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail,
  }));

  function onAuthorizeSuccess(data, accept) {
    console.log('socket autorized.');
    accept();
  }

  function onAuthorizeFail(data, message, error, accept) {
    if (error)
      throw new Error(message);
    console.log('failed connection to socket.io:', message);

    if (error)
      accept(new Error(message));
  }

}