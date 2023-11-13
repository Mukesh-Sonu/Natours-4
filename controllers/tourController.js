const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);


const checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`)
  
  if (tours.length - 1 < +req.params.id) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next()
}

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedTime: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const tourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: tourId }, req.body);

  const newTours = [...tours, newTour];
  // tours.push(newTour) // both are correct!

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (err) => {
        if(err) {
            console.log('Failed to write file');
        }
    }
  );

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: `<Updated tour here...>`,
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour, checkID };
