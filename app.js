const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


//start server
app.listen(PORT , () => {
    console.log(`App is running on port ${PORT}`);
});