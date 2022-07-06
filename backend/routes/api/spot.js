const express = require('express')
const { User, Spot, Image, Review, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors, validateReview } = require('../../utils/validation');



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
//question 3: need to fix the preview Images
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll()
    res.json({ spots })
    res.status(200)
})


//Get all Spots owned by the Current User
//question 3: need to fix the preview Images, also how to order the columns
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    const { user } = req
    let { id } = user
    const spots = await Spot.findAll({
        // include: {
        //     model: Image,   
        //     attributes: ['url']
        // },
        where: {
            ownerId: id
        },

    })
    if (!spots.length) return res.send('The current user does not have a listing property.')

    res.json({ spots })
})

//Get details of a Spot from an id
//Question: data need to get specifit column
router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const spot = await Spot.findByPk(id,
        {
            include: [
                {
                    model: Review,
                    attributes: [
                    ]
                },
                {
                    model: Image,
                    attributes: ['url']
                },
                {
                    model: User,
                    as: 'Owners',
                    attributes: ['id', 'firstName', 'lastName']
                },

            ],
            attributes: [
                "id", "ownerId", "address", "city", "state", "country", "lat",
                "lng", "name", "description", "price", "createdAt", "updatedAt",
                [sequelize.fn("count", sequelize.col("review")), "numReviews"],
                [sequelize.fn("avg", sequelize.col("stars")), "avgStarRating"]
            ]

        }
    )

    if (!spot.id) {
        const err = new Error('Invalid credentials');
        err.message = "Spot couldn't be found'"
        err.status = 404;
        return next(err);
    }

    res.json(spot)

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
        return res.json(spot)
    } else {
        const err = new Error('Spot couldn\'t be found');
        err.message = "Spot couldn't be found'"
        err.status = 404;
        return next(err);
    }

})

// Delete a Spot
router.delete('/:id', requireAuth, async (req, res, next) => {
    const spotId = req.params.id
    const ownerId = req.user.id
    const spot = await Spot.findByPk(spotId)
    if (spot) {
        if (spot.ownerId === ownerId) {
            await spot.destroy()
            res.status(200)
            return res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        }

    } else {
        const err = new Error('Spot couldn\'t be found');
        err.message = "Spot couldn't be found'"
        err.status = 404;
        return next(err);
    }


})


//Get all Reviews by a Spot's id

router.get('/:id/reviews', async (req, res, next) => {
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


module.exports = router;

