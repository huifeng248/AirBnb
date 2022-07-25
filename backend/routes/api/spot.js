const express = require('express')
const { User, Spot, Image, Review, Booking, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors, validateReview, validateBooking,imageValidate, queryParamValidate } = require('../../utils/validation');
const { Op } = require("sequelize");


const router = express.Router();

const validateSpotPost = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is require"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is require"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('state')
        .isAlpha()
        .withMessage('State must be letters'),
    check('state')
        .isLength({ min: 2 })
        .withMessage('must be at least 2 characters or more'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Name is required"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors

]

//Get all Spots

router.get('/', queryParamValidate, async (req, res, next) => {
    let pagination = {}
    

    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query
    page = page === undefined? 0 : parseInt(page)
    size = size === undefined? 20: parseInt(size)

    if (size > 0 && page > 0) {
        pagination.limit = size
        pagination.offset = size * (page -1)
    }

    const where = {}
    //latitude
    if (minLat && maxLat) {
        where.lat = { [Op.between] : [minLat, maxLat]}
    }
    if (minLat && !maxLat) {
        where.lat = {[Op.gte]: minLat}
    }
    if (!minLat && maxLat) {
        where.lat = {[Op.lte]: maxLat}
    }
    
    //longtitude
    if (minLng && maxLng) {
        where.lng = {[Op.between] : [minLng, maxLng]}
    }
    if (minLng && !maxLng) {
        where.lng = {[Op.gte]: minLng}
    }
    if (!minLng && maxLng) {
        where.lng = {[Op.lte]: maxLng}
    }
    if (minPrice && maxPrice) {
        where.price = {[Op.between] : [minPrice, maxPrice]}
    }
    if (minPrice && !maxPrice) {
        where.price = {[Op.gte]: minPrice}
    }
    if (!minPrice && maxPrice) {
        where.price = {[Op.lte]: maxPrice}
    }
    


    const spots = await Spot.findAll({
        where,
        ...pagination
    })
    res.status(200)
    res.json({ spots })
})


//Get all Spots owned by the Current User

router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    const { user } = req
    let { id } = user
    const spots = await Spot.findAll({
     
        where: {
            ownerId: id
        },

    })
    if (!spots.length) return res.send('The current user does not have a listing property.')

    res.json({ spots })
})

//Get details of a Spot from an id

router.get('/:id', async (req, res, next) => {
    const spotId = req.params.id
    const spot = await Spot.findByPk(spotId)
    const userId = spot.ownerId
    if (!spot.id) {
        const err = new Error('Invalid credentials');
        err.message = "Spot couldn't be found'"
        err.status = 404;
        return next(err);
    }
    
    const numReviews = await Review.count({
        where: {
            spotId
        }
    })
    
    const reviewRating = await Review.findAll({
        where: {
            spotId
        },
        attributes: [
            [sequelize.fn("avg", sequelize.col('stars')), "avgStatRating"]
        ],
        raw: true,
    })
    

    const images = await Image.findAll({
        where: {
            spotId
        },
        attributes: ['url']
    })

    const owner = await User.findByPk(userId, {
        attributes: ['id', 'firstName', 'lastName']
    })

    const result = {
        id: spotId,
        ownerId: userId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: numReviews,
        avgStatRating: parseFloat(reviewRating[0].avgStatRating),
        images: images,
        owner: owner
    }
    res.json(result)

    //eager loading
    // const spot = await Spot.findByPk(spotId,
    //     {
    //         include: [
    //             {
    //                 model: Review,
    //                 attributes: [
    //                 ]
    //             },
    //             {
    //                 model: Image,
    //                 attributes: ['url']
    //             },
    //             {
    //                 model: User,
    //                 as: 'Owners',
    //                 attributes: ['id', 'firstName', 'lastName']
    //             },

    //         ],
    //         attributes: [
    //             "id", "ownerId", "address", "city", "state", "country", "lat",
    //             "lng", "name", "description", "price", "createdAt", "updatedAt",
    //             [sequelize.fn("count", sequelize.col("review")), "numReviews"],
    //             [sequelize.fn("avg", sequelize.col("stars")), "avgStarRating"]
    //         ]

    //     }
    // )
    // res.json(spot)

})

//Create a Spot
router.post('/', restoreUser, requireAuth, validateSpotPost, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const ownerId = req.user.id

    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201)
    res.json(newSpot)

})

//Edit a Spot
router.put('/:id', requireAuth, validateSpotPost, async (req, res, next) => {
    const spotId = req.params.id
    const ownerId = req.user.id

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.message = "Spot couldn't be found'"
        err.status = 404;
        return next(err);
    }


    if (spot.ownerId === ownerId) {
            spot.address = address,
            spot.city = city,
            spot.state = state,
            spot.country = country,
            spot.lat = lat,
            spot.lng = lng,
            spot.name = name,
            spot.description = description,
            spot.price = price
            await spot.save()
        return res.json(spot)
    } else {
        const err = new Error();
        err.message = "Forbidden"
        err.status = 403;
        return next(err);
    }

})

// Delete a Spot
router.delete('/:id', requireAuth, async (req, res, next) => {
    const spotId = req.params.id
    const ownerId = req.user.id
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.message = "Spot couldn't be found'"
        err.status = 404;
        return next(err);
    }

    if (spot.ownerId === ownerId) {
        await spot.destroy()
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


//Get all Reviews by a Spot's id
//need lazy loading?

router.get('/:id/reviews',requireAuth, async (req, res, next) => {
    const spotId = req.params.id
    const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Image,
                attributes: ['url']
            }
        ],
        attributes: ['id', 'userId', 'spotId', 'review', 'stars']
    })

    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.message = "Spot couldn't be found'"
        err.status = 404;
        return next(err);
    }

    if (!reviews.length) return res.send('The spot does not have a review yet.')

    res.json({ reviews })

})

//Create a Review for a Spot based on the Spot's id

router.post('/:id/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body
    const spotId = req.params.id
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.message = "Spot couldn't be found"
        err.status = 404;
        return next(err);
    }

    const reviewPrevious = await Review.findOne({
        where: {
            spotId,
            userId
        }
    })

    if (reviewPrevious) {
        const err = new Error('User already has a review for this spot');
        err.message = "User already has a review for this spot"
        err.status = 403;
        return next(err);
    }

    const newReview = await Review.create({
        userId,
        spotId,
        review,
        stars
    })
    res.status(200)
    res.json(newReview)

})

//Get all Bookings for a Spot based on the Spot's id
router.get('/:id/bookings', requireAuth, async(req, res, next) => {
    const spotId = req.params.id
    const userId = req.user.id

    const allBookings = await Booking.findAll({
        where: {
            spotId
        }, 
        include: [
            {
                model: Spot,
                attributes: ['ownerId']
            }
        ]
    })

    if (!allBookings.length){
        const err = new Error('');
        err.message = "Spot couldn't be found"
        err.status = 404;
        return next(err);
    }

    for (let booking of allBookings) {
        if (userId === booking.Spot.ownerId){
            const bookings = await Booking.scope('owner').findAll({
                where: {
                    spotId
                }
            })
            res.json({bookings})
        } else {
            const bookings = await Booking.scope('user').findAll({
                where: {
                    spotId
                }
            })
            res.json({bookings})
        }
    }
})

//Create a Booking from a Spot based on the Spot's id

const spotValidaton = async (req, res, next) => {
    const spotId = req.params.id
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        const err = new Error('');
        err.message = "Spot couldn't be found"
        err.status = 404;
        return next(err);
    }
    next()
}

const bookingScheduleValidation = async(req, res, next) => {
    const userId = req.user.id
    const spotId = req.params.id
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)
    const existingBookings = await Booking.findAll({
        where: {
            spotId
        },
        order: [['startDate']]
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
    next()
}

router.post('/:id/bookings', requireAuth, validateBooking, spotValidaton, bookingScheduleValidation, async(req, res, next)=>{
    const userId = req.user.id
    const spotId = req.params.id
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)

    // const spot = await Spot.findByPk(spotId)
    // if (!spot) {
    //     const err = new Error('');
    //     err.message = "Spot couldn't be found"
    //     err.status = 404;
    //     return next(err);
    // }

    // const existingBookings = await Booking.findAll({
    //     where: {
    //         spotId
    //     },
    //     order: [['startDate']]
    // })

    // let dates = []
    // console.log(existingBookings.length)
    // for (let booking of existingBookings) {
    //     dates.push([booking.startDate, booking.endDate])
    // }
    // console.log(dates)
    // console.log("~~~~~", startDate, endDate)
    // for (let pair of dates) { // this is not working, need to work on this tomorrow.
    //     console.log(startDate.getTime() > new Date(pair[0]).getTime()  && startDate.getTime()  < new Date(pair[1].getTime() ))
    //     console.log((endDate.getTime()  > new Date(pair[0]).getTime()   && endDate.getTime()  < new Date(pair[1]).getTime() ), pair)
    //     console.log(startDate.getTime() <= new Date(pair[0].getTime()  && endDate.getTime() >= pair[0].getTime() , pair))
    //     if ((startDate > new Date(pair[0]) && startDate < new Date(pair[1]))
    //         || ((endDate > new Date(pair[0]) && endDate < new Date(pair[1])))
    //         || ((startDate <= new Date(pair[0]) && endDate >= new Date (pair[0])) )) {
    //         const err = new Error();
    //         err.message = "Sorry, this spot is already booked for the specified dates"
    //         err.errors = {
    //             "startDate": "Start date conflicts with an existing booking",
    //             "endDate": "End date conflicts with an existing booking"
    //         }
    //         err.status = 403;
    //         return next(err);
            
    //     }
    // }
    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    })

    
    res.status(200)
    return res.json(newBooking)

})


//Add an Image to a Spot based on the Spot's id
router.post('/:id/images', requireAuth, imageValidate, async(req, res, next)=>{
    const userId = req.user.id
    const spotId = req.params.id
    const spot = await Spot.findByPk(spotId)
    const {url} = req.body
   

    if (!spot) {
        const err = new Error('');
        err.message = "Spot couldn't be found"
        err.status = 404;
        return next(err);
    }

    if (spot.ownerId === userId) {
        const newImage = await Image.create({
            url,
            spotId, 
            userId,
            imageableType: "Spot"
        })

        const result = {}
        result.id = newImage.id,
        result.imageableId = newImage.spotId,
        result.imageableType = newImage.imageableType
        result.url = url
        res.status(200)
        return res.json(result)

    } else {
        const err = new Error();
        err.message = "Forbidden"
        err.status = 403;
        return next(err);
    }
})






module.exports = router;

