const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


const getAllTours = (req, res, next) => {
    res.status(200).json({
        status: 'sucess',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
};

const getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(tour => tour.id === id);

    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    } else {
        res.status(200).json({
            status: 'sucess',
            data: {
                tour
            }
        });
    }
};

const createTour = (req, res, next) => {
    console.log(req.body);
    console.log(tours.length);
    const newId = tours[tours.length - 1].id + 1;
    console.log(newId);
    const newTour = Object.assign({ id: newId }, req.body); //creates a new obj
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours), err => {
            if (err) {
                console.log(`Error: ${err}`)
            } else {
                res.status(201).json({
                    status: 'success',
                    data: {
                        tour: newTour
                    }
                });
            }
        });
};

const updateTour = (req, res, next) => {
    if (req.params.id * 1 > tours.length) {
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
};

const deleteTour = (req, res, next) => {
    if (req.params.id * 1 > tours.length) {
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
};


module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour
}