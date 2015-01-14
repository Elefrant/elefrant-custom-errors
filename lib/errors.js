'use strict';

var _ = require('lodash'),
	utils = require('util');

var registerError = function(restify, constructor, error, name) {
	utils.inherits(error, restify[constructor]);
	restify.errors[name] = error;
	restify[name] = error;
	return;
};

module.exports = function (restify) {

	// Orm Error
	function OrmError(message, validateMessages) {
		var err = message.toJSON();

		// Check if is Database or Validation error
		if(err.error === 'E_VALIDATION') {
			this.ormStatusCode = 4100;
			message = {};
			validateMessages = validateMessages  || {};

			_(err.invalidAttributes)
				.each(function (attrb, name) {
					if(! _.isEmpty(attrb[0])) {
						if(validateMessages && validateMessages[name] && validateMessages[name][attrb[0].rule]) {
							message[name] = validateMessages[name][attrb[0].rule];
						} else {
							message[name] = attrb[0].message;
						}
					}
				});

		} else if(err.error === 'E_UNKNOWN') {
			this.ormStatusCode = 4200;
			message = 'There was an error in the database.';

			if(err.raw.name === 'MongoError') {
				if(err.raw.code ===  11000) {
					var key = err.raw.err.match(/\$(.*?)_/gi);
					if(key[0]) {
						key = key[0].slice(1, key[0].length - 1);
						message = {};
						message[key] = 'The value already exist'
					} else {
						message = 'Duplicate key: ' + err.raw.err.match(/"(.*?)"/gi);
					}
				}
			}
		}

		restify.RestError.call(this, {
			restCode: 'OrmError',
			statusCode: err.status,
			message: message,
			constructorOpt: OrmError
		});
	}
	registerError(restify, 'RestError', OrmError, 'OrmError');

	// Validation Error
	function ValidationError(message) {

		var err = {};

		_(message)
			.each(function (attrb, name) {
				err[attrb.field] = attrb.message;
			});

		restify.RestError.call(this, {
			restCode: 'ValidationError',
			statusCode: 400,
			message: err,
			constructorOpt: ValidationError
		});
	}
	registerError(restify, 'RestError', ValidationError, 'ValidationError');

	return true;
};
