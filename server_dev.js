require('dotenv').config();
let server= require('express')(),
    morgan = require('morgan'),
	app = require('./app');

server.use(morgan('dev'));
server.use('/server', app);
server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));