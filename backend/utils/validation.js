// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');


// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => errors[error.param]= `${error.msg}`); //question 1: need to check with T

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

module.exports = {
  handleValidationErrors,
  validateReview
};