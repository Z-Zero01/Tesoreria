const path = require('path')
// const glob = require("glob");
const express = require('express');

const app = express();

app.use(require('./members'));
app.use(require('./offering'));
app.use(require('./list'))
app.use(require('./404'));

module.exports = app 


