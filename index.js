/*!
 * Input System
 */

/**
 * Module Dependencies
 */

var di = require('di'),
    Input,
    Config,
    System,
    Window = require('big-block-window');

/**
 * Input System
 *
 * @param {Array} config
 * @param {EventEmitter} window
 * @return {InputSystem}
 * @api public
 */
System = function (config, window) {

  var self = {},
      values = {},
      namesByKeyCode = {},
      pressed = {},
      i;

  Object.keys(config).forEach(function (value) {
    values[value] = 0;
    if (config[value].positiveKeyCode) {
      pressed[config[value].positiveKeyCode] = false;
      namesByKeyCode[config[value].positiveKeyCode] = {
        name: value,
        value: 1
      }
    };
    if (config[value].negativeKeyCode) {
      pressed[config[value].negativeKeyCode] = false;
      namesByKeyCode[config[value].negativeKeyCode] = {
        name: value,
        value: -1
      }
    };
  });

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

Config = function () {
  return {};
};

/**
 * Dependency Annotation
 */

di.annotate(System, new di.InjectAnnotation(Config, Window));

Input = {
  System: System,
  Config: Config
};

/**
 * Module Exports
 */
exports = module.exports = Input;