"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// Create Express server
const app = express();
// Express configuration
app.set('port', process.env.PORT || 3000);
exports.default = app;
