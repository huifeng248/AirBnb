// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');


// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    // const errors = {};
    // validationErrors.array().forEach((error) => errors[error.param]= `${error.msg}`); 
    const errors = validationErrors
    // console.log("huiFFFF",validationErrors )
      .array()
      .map((error) => `${error.msg}`);
      // .map((error) => `${error.errors}`);
      // .map((error) =>'')

    const err = Error('Validation error');
    err.errors = errors;
    err.status = 400;
    err.title = 'Validation error';
    next(err);
  }
  next();
};


const validateReview = [
  check('review')
      .exists({checkFalsy: true})
      .withMessage('Review text is required'),
  check('review')
      .isLength({ min: 3 })
      .withMessage('Please provide a review with at least 3 characters.'),
  check('stars')
      .exists({checkFalsy:true})
      .withMessage('Stars rating is required'),
  check('stars')
      // .custom( value => {value >=1 && value <=5})
      // .withMessage('Stars must be an integer from 1 to 5'),
      .custom(value => {
          if (value <1 || value>5) {
              throw new Error('Stars must be an integer from 1 to 5')
          }
          return true
      }),
  handleValidationErrors
];

const validateBooking = [
  check('startDate')
    .exists({checkFalsy: true})
    .withMessage('startDate is required'),
  check('endDate')
    .exists({checkFalsy: true})
    .withMessage('endDate is required'),

  check('endDate')
    .custom((value, { req }) => {
      if(new Date(value) <= new Date(req.body.startDate)) {
        throw new Error ('endDate cannot come before startDate');
    }
    return true;
  }),
  check('startDate')
  .custom((value, { req }) => {
    const today =new Date()
    if(new Date(value) <= today) {
      throw new Error ('Start Date must be greater than today')
    }
    return true;
  }),
  handleValidationErrors
];

const imageValidate = [
  check('url')
    .exists({checkFalsy:true})
    .withMessage("Image is required")
    .isURL()
    .withMessage('must be url'),
  handleValidationErrors
];

const queryParamValidate = [
  check('page') 
    .custom(value =>{
      if (value < 0) {
        throw new Error('Page must be greater than or equal to 0')
      }
      return true
    }),
  check('size')
    .custom(value => value >=0 || value === undefined )
    .withMessage('Size must be greater than or equal to 0'),
  check('minLat')
    .custom(value =>{
      if (value < -90) {
        throw new Error ('Minimum latitude is invalid')
      }
      return true
    }), 
  check('maxLat')
    .custom(value =>{
      if (value > 90) {
        throw new Error('Maximum latitude is invalid')
      }
      return true
    }),
  check('minLng')
    .custom(value => value === undefined || value >= -180)
    .withMessage('Minimum longitude is invalid'),
  check('maxLng')
    .custom(value =>value <= 180 || value === undefined)
    .withMessage('Maximum longitude is invalid'), 
  check('minPrice')
    .custom(value => value >0 || value === undefined)
    .withMessage('Minimum price must be greater than 0'),
  check('maxPrice')
    .custom(value => value >0 || value === undefined)
    .withMessage('Maximum price must be greater than 0'),
  handleValidationErrors
]


module.exports = {
  handleValidationErrors,
  validateReview,
  validateBooking,
  imageValidate,
  queryParamValidate,
  
};