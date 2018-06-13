var express = require('express');
var chalk = require('chalk');

console.log('%s 2. App Initialized!', chalk.green('✓'));

var middlewaresBase = require('./base.middleware.js');

module.exports = express().use(middlewaresBase.configuration());
