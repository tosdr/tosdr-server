'use strict';

var fs = require('fs'), path = require('path');
var express = require('express');
var app = express();
var config = JSON.parse(fs.readFileSync('./package.json'));

if(config['tosdr-files']){
	app.use(express.static(path.resolve(__dirname, '../', config['tosdr-files'])));
}

app.listen(8000);
console.info('Listening at port 8000...');
