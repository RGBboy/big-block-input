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
    window,
    input,
    positiveKeyCode = '38',
    negativeKeyCode = '40';

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  window = helpers.EventEmitter(sandbox);
  input = Input(window);
};

var setupAxis = function (t) {
  input.defineAxis('vertical', positiveKeyCode, negativeKeyCode);
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
 * input.defineAxis
 */

test('input.defineAxis should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof input.defineAxis, 'function');
  teardown(t);
});

test('input.defineAxis should define an axis', function (t) {
  setup(t);
  t.plan(1);
  input.defineAxis('vertical', positiveKeyCode, negativeKeyCode);
  t.equal(input.getAxis('vertical'), 0)
  teardown(t);
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

test('input.getAxis should return undefined for undefined axis', function (t) {
  setup(t);
  t.plan(1);
  t.equal(input.getAxis('undefined'), undefined);
  teardown(t);
});

test('input.getAxis should return 1 for positive keydown event', function (t) {
  setup(t);
  setupAxis(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: positiveKeyCode
  });
  t.equal(input.getAxis('vertical'), 1);
  teardown(t);
});

test('input.getAxis should return -1 for negative keydown event', function (t) {
  setup(t);
  setupAxis(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: negativeKeyCode
  });
  t.equal(input.getAxis('vertical'), -1);
  teardown(t);
});

test('input.getAxis should return 0 for no keydown event', function (t) {
  setup(t);
  setupAxis(t);
  t.plan(1);
  t.equal(input.getAxis('vertical'), 0);
  teardown(t);
});

test('input.getAxis should return 0 for positive keyup event', function (t) {
  setup(t);
  setupAxis(t);
  t.plan(1);
  window.emit('keyup', {
    keyCode: positiveKeyCode
  });
  t.equal(input.getAxis('vertical'), 0);
  teardown(t);
});

test('input.getAxis should return 1 for multiple positive keydown events', function (t) {
  setup(t);
  setupAxis(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: positiveKeyCode
  });
  window.emit('keydown', {
    keyCode: positiveKeyCode
  });
  t.equal(input.getAxis('vertical'), 1);
  teardown(t);
});

test('input.getAxis should return 0 for positive and negative keydown events', function (t) {
  setup(t);
  setupAxis(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: positiveKeyCode
  });
  window.emit('keydown', {
    keyCode: negativeKeyCode
  });
  t.equal(input.getAxis('vertical'), 0);
  teardown(t);
});

test('input.getAxis should return 0 for positive keydown then keyup events', function (t) {
  setup(t);
  setupAxis(t);
  t.plan(1);
  window.emit('keydown', {
    keyCode: positiveKeyCode
  });
  window.emit('keyup', {
    keyCode: positiveKeyCode
  });
  t.equal(input.getAxis('vertical'), 0);
  teardown(t);
});

test('input.getAxis should return 1 for positive keyup then keydown events', function (t) {
  setup(t);
  setupAxis(t);
  t.plan(1);
  window.emit('keyup', {
    keyCode: positiveKeyCode
  });
  window.emit('keydown', {
    keyCode: positiveKeyCode
  });
  t.equal(input.getAxis('vertical'), 1);
  teardown(t);
});