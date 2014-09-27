'use strict';

var fs = require('fs'), path = require('path');
var https = require('https');
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

app.use('/post/point', require('saveComments'));
app.use('/get/pendingpoints', require('getPendingpoints'));

if (config['https']) {
  https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, '../', config['https'].key)),
    cert: fs.readFileSync(path.resolve(__dirname, '../', config['https'].cert)),
    ca: fs.readFileSync(path.resolve(__dirname, '../', config['https'].ca))
  }, app).listen(4343);
} else {
  app.listen(4343);
}

console.info('Listening at port 4343...');
