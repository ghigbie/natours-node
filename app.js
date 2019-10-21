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

    if(id > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }else{
    res.status(200).json({
        status: 'sucess',
        data: {
                tour
            }
        });
    }
})

app.post('/api/v1/tours', (req, res) => {
    console.log(req.body);
    console.log(tours.length);
    const newId = tours[tours.length-1].id+1;
    console.log(newId);
    const newTour = Object.assign({id: newId}, req.body); //creates a new obj
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
        JSON.stringify(tours), err => {
            if(err){ 
                console.log(`Error: ${err}`)
            }else{
                res.status(201).json({
                    status: 'success',
                    data: {
                        tour: newTour
                    }
                });
            }
    });
});

app.patch('/api/v1/tours/:id', (req, res, next) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json(
        {
            status: 'success',
            data: {
                tour: '<Updated tour here>'
            }
        }
    );
});

app.delete('/api/v1/tours/:id', (req, res, next) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        message: 'Tour was deleted',
        data: null
    })
});


app.listen(PORT , () => {
    console.log(`App is running on port ${PORT}`);
});