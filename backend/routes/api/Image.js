const express = require('express')
const { User, Spot, Image, Review, Booking, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors, validateReview, validateBooking } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

router.delete('/:id', async(req, res, next)=>{
    const userId = req.user.id
    const imageId = req.params.id
    const image = await Image.findByPk(imageId)
    if (!image) {
        const err = new Error('');
        err.message = "Image couldn't be found"
        err.status = 404;
        return next(err);
    }

    if (image.userId === userId) {
        await image.destroy()
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
