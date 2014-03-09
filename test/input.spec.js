/*!
 * Input unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    Input = require('../index'),
    input;

/**
 * Setup
 */

var setup = function (t) {
  input = Input();
};

/**
 * Teardown
 */

var teardown = function (t) {
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

test('input.getAxis', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof input.getAxis, 'function');
  teardown(t);
});