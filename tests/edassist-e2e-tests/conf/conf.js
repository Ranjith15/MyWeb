var config = require('./base_conf.js');
config.baseUrl = 'https://cisco-stg.edassist.com/';
config.params = {
		participant: {
			user: 'mabdulsy',
			password: 'Welcome1'
		},
		supervisor: {
			user: 'kashoka',
			password: 'Welcome1'
		}
	};

exports.config = config;
