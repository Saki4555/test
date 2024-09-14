const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');

const app = express();

//middlewares -----------------

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 10000, // 1 minutes
    max: 5,
    message: 'Too many requests from this IP.Please try again later',
})

app.use(rateLimiter);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

//------------------------------

app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'Welcome to the server',
    });
});



//client error-handling middleware
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
});

//server error-handling middleware
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});

module.exports = app;