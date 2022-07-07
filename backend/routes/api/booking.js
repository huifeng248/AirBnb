const express = require('express')
const { User, Spot, Image, Review, Booking, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors, validateReview } = require('../../utils/validation');


const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res, next) => {
    const userId = req.user.id 
    const bookings = await Booking.findAll({
        where: {
            userId
        },
        include: [{
            model: Spot
        },
        ],

    })
   
    res.json(bookings)
})





module.exports = router;

