const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const PORT = 3000;


//Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log('moo');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));



//routehandlers
const getAllTours = (req, res, next) => {
    res.status(200).json({
        status: 'sucess',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })};

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

const getAllUsers = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const createUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const getUser = (req, res, next) => {
    res.status.json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const updateUser = (req, res, next) => {
    res.status.json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const deleteUser = (req, res, next) => {
    res.status.json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}
//routes 

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(crateUser);

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser)
    
//start server
app.listen(PORT , () => {
    console.log(`App is running on port ${PORT}`);
});