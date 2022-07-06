const express = require('express')
const {Review, User, Image, Spot} = require('../../db/models')
const {requireAuth, restoreUser } = require('../../utils/auth')
const {check} = require('express-validator')
const { handleValidationErrors, validateReview } = require('../../utils/validation');
const spot = require('../../db/models/spot');


const router = express.Router();


//Get all Reviews of the Current User
router.get('/current', requireAuth, async(req, res)=> {
    const userId = req.user.id
    const reviews = await Review.findAll({
        where: {
            userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: Image,
                attributes: ['url']
            }
        ],
        attributes: ['id', 'userId', 'spotId', 'review', 'stars']
    })

    if (!reviews.length) return res.send('The current user does not have a review yet.')

    res.json({reviews})
})


//Edit a Review
router.put('/:id', requireAuth, validateReview, async(req, res, next) => {
    const reviewId = req.params.id
    const userId = req.user.id
    const {review, stars} = req.body
    const reviewExited = await Review.findByPk(reviewId)
    if (!reviewExited) {
        const err = new Error();
        err.message = "Review couldn't be found"
        err.status = 404;
        return next(err);
    }

  if (reviewExited.userId === userId) {
    reviewExited.review = review,
    reviewExited.stars = stars
    return res.json(reviewExited)
  } else {
    return res.send('Cannot edit others\' review')
  }
})

// Delete a Review
router.delete('/:id', requireAuth, async(req, res, next)=> {
    const reviewId = req.params.id
    const userId = req.user.id
    const reviewExited = await Review.findByPk(reviewId)
    if (!reviewExited) {
        const err = new Error();
        err.message = "Review couldn't be found"
        err.status = 404;
        return next(err);
    }

    if (reviewExited.userId === userId) {
        await reviewExited.destroy()
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200 
        })
      } else {
        return res.send('Cannot delete others\' review')
      }
    
})








module.exports = router;

