const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res, next) => {
    res
        .status(200)
        .json({
            status: 'sucess',
            data: {
                tours
            }
        });
});


app.listen(PORT , () => {
    console.log(`App is running on port ${PORT}`);
});