'use strict';

var fs = require('fs'), path = require('path');
var express = require('express');
var persona = require('express-persona');
var cors = require('cors');

var app = express();
var config = require('config');
if(config['tosdr-files'] && config['tosdr-files'].serve && config['tosdr-files'].location){
	console.info('Serving files from', path.resolve(__dirname, '../', config['tosdr-files'].location));
	app.use(express.static(path.resolve(__dirname, '../', config['tosdr-files'].location)));
}

app.use(express.bodyParser())
   .use(express.cookieParser())
   .use(express.session({ secret: 'tosdrserver' }))
   .use(cors({origin: config.persona.audience, credentials: true}));
persona(app, config.persona);

app.use('/post/comment', require('saveComments'));

app.listen(8000);
console.info('Listening at port 8000...');
