const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res, next) => {
    res
        .status(200)
        .json({
            status: 'sucess',
            results: tours.length,
            data: {
                tours
            }
        });
});

app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(tour => tour.id === id);
    res
        .status(200)
        .json({
            status: 'sucess',
            data: {
                tour
            }
        });
})

app.post('/api/v1/tours', (req, res) => {
    console.log(req.body);
    const newId = tours[tours.length-1] +1;
    const newTour = Object.assign({id: newId}, req.body); //creates a new object by merging two objects together
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
        JSON.stringify(tours), err => {
            if(err){ 
                console.log(`Error: ${err}`)
            }else{
                res
                    .status(201)
                    .json({
                        status: 'success',
                        data: {
                            tour: newTour
                        }
                    })
            }
    });
});


app.listen(PORT , () => {
    console.log(`App is running on port ${PORT}`);
});