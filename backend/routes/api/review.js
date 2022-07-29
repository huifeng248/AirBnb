const express = require('express')
const {Review, User, Image, Spot} = require('../../db/models')
const {requireAuth, restoreUser } = require('../../utils/auth')
const {check} = require('express-validator')
const { handleValidationErrors, validateReview, imageValidate } = require('../../utils/validation');
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

    if (!reviews.length) 
    return res.json(
        {
            "message": "The current user does not have a review yet"
          }
    )
    // return res.send('The current user does not have a review yet.')

    res.json(reviews)
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
        err.errors = ["The requested resource couldn't be found."];
        return next(err);
    }

  if (reviewExited.userId === userId) {
    reviewExited.review = review,
    reviewExited.stars = stars
    await reviewExited.save()
    return res.json(reviewExited)
  } else {
    const err = new Error();
    err.message = "Forbidden"
    err.status = 403;
    err.errors = ["Forbidden"]
    return next(err);
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
        err.errors = ["The requested resource couldn't be found."];
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
        const err = new Error();
        err.message = "Forbidden"
        err.status = 403;
        err.errors=["Forbidden"]
        return next(err);
      }
    
})

//Add an Image to a Review based on the Review's id

router.post('/:id/images', requireAuth, imageValidate, async(req, res,next)=>{
    const userId = req.user.id
    const reviewId = req.params.id
    const review = await Review.findByPk(reviewId)
    const {url} = req.body

    if (!review) {
        const err = new Error('');
        err.message = "Review couldn't be found"
        err.errors = ["The requested resource couldn't be found."];
        err.status = 404;
        return next(err);
    }

    const imagesByReview = await Image.findAll({
        where: {
            reviewId
        }
    }) 

    if (imagesByReview.length >= 10) {
        const err = new Error();
        err.message = "Maximum number of images for this resource was reached"
        err.status = 400;
        return next(err);
    }

    if (review.userId === userId) {
        const newImage = await Image.create({
            url,
            reviewId, 
            userId,
            imageableType: "Review"
        })
        const result = {}
        result.id = newImage.id,
        result.imageableId = newImage.reviewId,
        result.imageableType = newImage.imageableType
        result.url = url
        res.status(200)
        return res.json(result)
    } else {
        const err = new Error();
        err.message = "Forbidden"
        err.status = 403;
        err.errors=["Forbidden"]
        return next(err);
    }
})





module.exports = router;

