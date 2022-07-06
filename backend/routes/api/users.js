// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage("email is required"),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: false }) //username is not required for sign up.
    .withMessage('username is required'),
  check('username')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true})
    .withMessage('First Name is required'),
  check('firstName')
    .isAlpha()
    .withMessage('First name must be letters'),
  check('firstName')
    .isLength ({min: 2})
    .withMessage('First name must have 2 characters or more'),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage("Last Name is required"),
  check('lastName')
    .isAlpha()
    .withMessage('Last name must be letters'),
  check('lastName')
    .isLength ({min: 2})
    .withMessage('Last name must have 2 characters or more'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


//Get the Current User
router.get('/current', requireAuth, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  } else return res.json({});
}
);


//Log In a User

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

router.post('/log-in', validateLogin, async (req, res, next) => {

  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Invalid credentials');
    err.message = "Invalid credentials'"
    err.status = 401;
    return next(err);
  }

  let token = await setTokenCookie(res, user);

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: token
  });
}
);


// Sign Up a User
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { email, password, username, firstName, lastName } = req.body;
  

      //check if the email is unique
      if (email) {

        let userByEmail = await User.findOne({
          where : {
            email: email
          }
        })
        if (userByEmail) {
          const err = new Error("email address must be uqniue");
          err.status = 403
          res.json({
            message: err.message,
            statusCode: err.status,
            errors: {
              "email": "User with that email already exists"
            }
          });
        }
      }
        
    //question 1: need to check with TA for 400 for error in array
    // question 2: how to get rif of the newUser
    
      const user = await User.signup({ email, username, password, firstName, lastName});
  
      let token = await setTokenCookie(res, user);

      const newUser = await User.findByPk(user.id)
      
      return res.json({
        newUser,
        token
      });
    }
  );

  // Log out
//delete the token what keeps the user log-in
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
}
);



module.exports = router;