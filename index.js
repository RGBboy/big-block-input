/*!
 * Input System
 */

/**
 * Module Dependencies
 */

var di = require('big-block').di,
    Input,
    Window = require('big-block-window');

/**
 * Input System
 *
 * @param {EventEmitter} window
 * @return {InputSystem}
 * @api public
 */
Input = function (window) {

  var self = {},
      values = {},
      namesByKeyCode = {},
      pressed = {},
      i;

  if (window) {
    window.addEventListener('keydown', function (event) {
      if (namesByKeyCode[event.keyCode] && !pressed[event.keyCode]) {
        pressed[event.keyCode] = true;
        values[namesByKeyCode[event.keyCode].name] += namesByKeyCode[event.keyCode].value;
      };
    });

    window.addEventListener('keyup', function (event) {
      if (namesByKeyCode[event.keyCode] && pressed[event.keyCode]) {
        pressed[event.keyCode] = false;
        values[namesByKeyCode[event.keyCode].name] -= namesByKeyCode[event.keyCode].value;
      };
    });
  };

  /**
   * .defineAxis
   *
   * @param {String} name
   * @param {String} positiveKeyCode
   * @param {String} negativeKeyCode
   * @return {undefined}
   * @api public
   */
  self.defineAxis = function (name, positiveKeyCode, negativeKeyCode) {
    values[name] = 0;
    if (positiveKeyCode) {
      pressed[positiveKeyCode] = false;
      namesByKeyCode[positiveKeyCode] = {
        name: name,
        value: 1
      };
    };
    if (negativeKeyCode) {
      pressed[negativeKeyCode] = false;
      namesByKeyCode[negativeKeyCode] = {
        name: name,
        value: -1
      };
    };
  };

  /**
   * .getAxis
   *
   * @return {Number} -1 ... 1
   * @api public
   */
  self.getAxis = function (name) {
    return values[name];
  };

  return self;

};

/**
 * Dependency Annotation
 */

di.annotate(Input, new di.Inject(Window));

/**
 * Module Exports
 */
exports = module.exports = Input;