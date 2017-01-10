import path from 'path';

export default (function() {
	// Cached config files
	let files = [];
	var appDir = __dirname; //path.dirname(require.main.filename);

	return function(key, fallback) {
		let keys = key.split('.');
		let file = keys.shift();
		let config;

		// See if the file is cached
		// NOTE: Careful with big config files as these are stored in memory!
		if (typeof files[file] !== 'undefined') {
			config = files[file];
		} else {
			// Attempt to require a config file
			try {
				config = require(`../../../../config/${file}`);

				if (typeof config.default !== 'undefined') {
					config = config.default;
				}
			} catch(e) {
				return fallback || null;
			}

			files[file] = config;
		}

		// Get the value from the config object from the dot notation
		return (keys.reduce((o,i) => {
			if (o === null || typeof o[i] === 'undefined') {
				return null;
			}

			return o[i];
		}, config)) || fallback || null;
	}
}())