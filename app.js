const express = require('express');
const ExpressError = require('./expressError');
const app = express();
const itemRoutes = require('./itemRoutes');

app.use(express.json());

app.use("/items", itemRoutes);

/// 404 handler
app.use(function (req, res) {
    return next(new ExpressError('Not Found', 404));
});
  
/// general error handler
app.use(function (err, req, res, next) {
    let status = err.status || 500;
    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;