'use strict';

var fs = require('fs'), path = require('path');
var express = require('express');
var persona = require('express-persona')

var app = express();
var config = JSON.parse(fs.readFileSync('./package.json'));

if(config['tosdr-files']){
	console.info('Serving files from', path.resolve(__dirname, '../', config['tosdr-files']));
	app.use(express.static(path.resolve(__dirname, '../', config['tosdr-files'])));
}

app.use(express.cookieParser())
   .use(express.session({ secret: 'tosdrserver' }));
persona(app, config.persona);

app.listen(8000);
console.info('Listening at port 8000...');
