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
  // check('username')
  //   .not()
  //   .isEmail()
  //   .withMessage('Username cannot be an email.'),
  // check('email')
  //   .custom(value => {
  //     userByEmail = await User.findOne({
  //       where : {
  //         email: email
  //       }
  //     })
  //     if (userByEmail) {
  //       throw new Error('email address must be uqniue')
  //     }
  //     return true}),
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
    err.message = "Invalid credentials"
    err.status = 401;
    err.errors = ['The provided credentials were invalid.'];
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
      const { email, username, password, firstName, lastName } = req.body;
  
      //check if the email is unique
      if (email) {
        let userByEmail = await User.findOne({
          where : {
            email: email
          }
        })
        if (userByEmail) {
          const err = new Error();
          err.message = "email address must be uqniue"
          err.status = 403
          err.errors = ["email address must be uqniue"]
          next(err)
        }
      }
      const newUser = await User.signup({ username, email, password, firstName, lastName});
      let token = await setTokenCookie(res, newUser);
      const user = await User.findByPk(newUser.id)
      
      return res.json({
        id:user.id,
        username: user.username,
        email:user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password:user.password,
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