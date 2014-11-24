'use strict';

var errors = require('./lib/errors');

module.exports = {
	enable: true,

	name: 'customErrors',

	afterServer: {
		weight: 1,
		func: function (elefrant, server, restify) {
			return errors(restify);
		}
	}
};
