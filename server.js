let server= require('express')(),
	fs = require("fs"),
	app = require('./app');

server.use('/server', app);
server.listen('/tmp/nginx.socket', () => fs.openSync('/tmp/app-initialized', 'w'));