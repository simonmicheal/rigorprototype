const path = require('path');

module.exports = {
    target: 'electron-renderer',
    // don't remove this comments it is used for parsing by postinstall.config.js
    // start of extra configs
    externals: {
        sqlite3: "require('sqlite3')",
        mssql: "require('mssql')"
    }
    // end of extra configs
};