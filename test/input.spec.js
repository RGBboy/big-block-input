/*!
 * Input unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    Input = require('../index'),
    helpers = require('./helpers'),
    sandbox,
    config,
    window,
    input;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  config = {
    'vertical': {
      positiveKeyCode: '38',
      negativeKeyCode: '40'
    },
    'horizontal': {
      positiveKeyCode: '39',
      negativeKeyCode: '37'
    }
  };
  window = helpers.EventEmitter(sandbox);
  input = Input(config, window);
};

/**
 * Teardown
 */

var teardown = function (t) {
  sandbox.restore();
};

/**
 * Input Class
 */

test('Input', function (t) {
  t.plan(1);
  t.ok(Input, 'class should exist');
});

/**
 * input.getAxis
 */

test('input.getAxis should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof input.getAxis, 'function');
  teardown(t);
});

test('input.getAxis should return 1 for positive keydown events', function (t) {
  setup(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: config.vertical.positiveKeyCode
  });
  t.equal(input.getAxis('vertical'), 1);
  teardown(t);
});

test('input.getAxis should return -1 for negative keydown events', function (t) {
  setup(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: config.vertical.negativeKeyCode
  });
  t.equal(input.getAxis('vertical'), -1);
  teardown(t);
});

test('input.getAxis should return 0 for no keydown events', function (t) {
  setup(t);
  t.plan(1);
  t.equal(input.getAxis('vertical'), 0);
  teardown(t);
});

test('input.getAxis should return 1 for multiple positive keydown events', function (t) {
  setup(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: config.vertical.positiveKeyCode
  });
  window.emit('keydown', {
    keyCode: config.vertical.positiveKeyCode
  });
  t.equal(input.getAxis('vertical'), 1);
  teardown(t);
});

test('input.getAxis should return 0 for positive and negative keydown events', function (t) {
  setup(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: config.vertical.positiveKeyCode
  });
  window.emit('keydown', {
    keyCode: config.vertical.negativeKeyCode
  });
  t.equal(input.getAxis('vertical'), 0);
  teardown(t);
});

test('input.getAxis should return 0 for positive keydown then keyup events', function (t) {
  setup(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: config.vertical.positiveKeyCode
  });
  window.emit('keyup', {
    keyCode: config.vertical.positiveKeyCode
  });
  t.equal(input.getAxis('vertical'), 0);
  teardown(t);
});