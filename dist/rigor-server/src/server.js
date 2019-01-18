"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// Define constant routes
//const users = require('./routes/users');
//app.use('/', users);
// Potentially lots of routes
// route our app
app_1.default.get('/', function (req, res) {
    res.send('hello world!');
});
// Start Express server.
const server = app_1.default.listen(app_1.default.get('port'), () => {
    console.log('App is running');
    console.log('Press CTRL-C to stop\n');
});
