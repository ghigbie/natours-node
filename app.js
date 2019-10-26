const express = require('express');
const morgan = require('morgan');
const app = express();

//routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


//Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/vi/tours', tourRouter);
app.use('/api/vi/users', userRouter);

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

module.export = app;