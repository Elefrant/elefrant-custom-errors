'use strict';

var errors = require('./lib/errors');

module.exports = {
	enable: true,

	name: 'customErrors',

	afterServer: function (elefrant, server, restify) {
		return errors(restify);
	}
};
