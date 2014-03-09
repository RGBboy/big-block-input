/*!
 * Event Emitter Mock
 */

/**
 * Module Dependencies
 */

var EventEmitterMock,
    EventEmitter = require('events').EventEmitter;

/**
 * EventEmitterMock
 *
 * @param {Object} sandbox, Sinon Sandbox
 * @return {EntityMock}
 * @api public
 */
EventEmitterMock = function (sandbox) {
  var self = sandbox.stub(),
      eventEmitter = new EventEmitter();
  self.addEventListener = eventEmitter.on;
  self.emit = eventEmitter.emit;
  sandbox.spy(self, 'addEventListener');
  return self;
};

/**
 * Module Exports
 */

exports = module.exports = EventEmitterMock