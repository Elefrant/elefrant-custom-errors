# Elefrant eTag

[![wercker status](https://app.wercker.com/status/ca90b21b622f2e3138b7ddac866e6323/s/master "wercker status")](https://app.wercker.com/project/bykey/ca90b21b622f2e3138b7ddac866e6323)

[![Dependency Status](https://gemnasium.com/Elefrant/elefrant-custom-errors.svg)](https://gemnasium.com/Elefrant/elefrant-custom-errors)


Extend elefrant errors and create your own type of errors.

## Install

```sh
$ elefrant install elefrant-custom-errors
```

## Usage

Activate the component.

Create your own type of error. Add the new type in `lib/errors.js` from the component folder.

```js
function MyNewError(message) {
	restify.RestError.call(this, {
		restCode: 'MyNewError',
		statusCode: 418,
		message: message,
		constructorOpt: MyNewError
	});
}
registerError(restify, 'RestError', MyNewError, 'MyNewError');
```

## Extra (Orm)

Format ORM errors and validation.

Add to models a new attribute `validationMessages`:

```js
...

attributes: {
		name: {
			type: 'string',
			required: true,
			unique: true,
			index: true
		}
	},

...

validationMessages : {
    name: {
        required: 'Name is required',
    }
}
...
```

And then usage in controller:

````js
next(new restify.OrmError(error, MyModel.validationMessages));

```

## License

MIT © [Elefrant](http://elefrant.com/#/license)
