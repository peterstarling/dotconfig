'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var config = exports.config = function () {
	// Cached config files
	var files = [];

	return function (key, fallback) {
		var keys = key.split('.');
		var file = keys.shift();
		var config = void 0;

		// See if the file is cached
		// NOTE: Careful with big config files as these are stored in memory!
		if (typeof files[file] !== 'undefined') {
			config = files[file];
		} else {
			// Attempt to require a config file
			try {
				config = require('../config/' + file);

				if (typeof config.default !== 'undefined') {
					config = config.default;
				}
			} catch (e) {
				return fallback || null;
			}

			files[file] = config;
		}

		// Get the value from the config object from the dot notation
		return keys.reduce(function (o, i) {
			if (o === null || typeof o[i] === 'undefined') {
				return null;
			}

			return o[i];
		}, config) || fallback || null;
	};
}();