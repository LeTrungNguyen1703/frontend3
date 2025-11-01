var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var contactRouter = require('./app/routes/contact.route');
const ApiError = require("./app/api-error");
var app = express();


app.use('/api/contacts', contactRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
