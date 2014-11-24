'use strict';

var component = require('../component'),
	restify = require('restify'),
	should = require('should');

var server = restify.createServer();

describe('Custom Errors', function () {

	it('exports an object', function () {
		should.exist(component);
	});

	it('check afterServer', function () {
		should(component.afterServer.func({}, server, restify)).be.ok;
	});
});
