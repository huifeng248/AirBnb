const express = require('express')
const { User, Spot, Image, Review, Booking, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors, validateReview, validateBooking } = require('../../utils/validation');
const { Op } = require("sequelize");

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


//Edit a Booking


router.put('/:id',requireAuth, validateBooking, async(req, res, next) => {
    const userId = req.user.id
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)
    const bookingId = req.params.id
    const booking = await Booking.findByPk(bookingId)
    const today = new Date()
 

    if (!booking) {
        const err = new Error('');
        err.message = "Booking couldn't be found"
        err.status = 404;
        return next(err);
    }

    if (new Date(booking.startDate)< today) {
        const err = new Error('');
        err.message = "Past bookings can't be modified"
        err.status = 400;
        return next(err);
    }

    if (booking.userId === userId) {
        const existingBookings = await Booking.findAll({
            where: {
                id:{
                    [Op.notIn]: [bookingId],  
                }
            }
        })
       
        let dates = []
        for (let booking of existingBookings) {
            dates.push([booking.startDate, booking.endDate])
        }
        for (let pair of dates) { 
            // console.log(startDate.getTime() > new Date(pair[0]).getTime()  && startDate.getTime()  < new Date(pair[1].getTime() ))
            // console.log((endDate.getTime()  > new Date(pair[0]).getTime()   && endDate.getTime()  < new Date(pair[1]).getTime() ), pair)
            // console.log(startDate.getTime() <= new Date(pair[0].getTime()  && endDate.getTime() >= pair[0].getTime() , pair))
            if ((startDate > new Date(pair[0]) && startDate < new Date(pair[1]))
                || ((endDate > new Date(pair[0]) && endDate < new Date(pair[1])))
                || ((startDate <= new Date(pair[0]) && endDate >= new Date (pair[0])) )) {
                const err = new Error();
                err.message = "Sorry, this spot is already booked for the specified dates"
                err.errors = {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
                err.status = 403;
                return next(err);
                
            }
        }

        // booking.update({
        //     startDate,
        //     endDate
        // })

        booking.startDate = startDate,
        booking.endDate = endDate,
        booking.save()
        
        res.status(200)
        return res.json(booking)

    } else {
        const err = new Error();
        err.message = "Forbidden"
        err.status = 403;
        return next(err);
    }
})

//Delete a Booking
router.delete('/:id', requireAuth, async(req, res, next) => {
    const userId = req.user.id
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)
    const bookingId = req.params.id
    const booking = await Booking.findByPk(bookingId)
    const today = new Date()
 
    //check if the booking exist
    if (!booking) {
        const err = new Error('');
        err.message = "Booking couldn't be found"
        err.status = 404;
        return next(err);
    }
    // check if past booking
    if (new Date(booking.startDate)< today) {
        const err = new Error('');
        err.message = "Bookings that have been started can/'t be deleted"
        err.status = 400;
        return next(err);
    }

    if (booking.userId === userId) {

        await booking.destroy()
        res.status(200)
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
        
    } else {
        const err = new Error();
        err.message = "Forbidden"
        err.status = 403;
        return next(err);
    }


})



module.exports = router;

