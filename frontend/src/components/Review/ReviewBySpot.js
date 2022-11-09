import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { GetReviewBySpot } from '../../store/review'
import { getOneSpot, DeleteSpot } from '../../store/spot'
import ReviewFormModal from '../ReviewFormModal'



function ReviewBySpot() {
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const reviews = useSelector(state => {
        return Object.values(state.reviews)
    })
    const spots = useSelector(state => state.spots)
    const user = useSelector(state => state.session.user)
    const spot = spots[id]
    const filteredReviews = reviews.filter(review => review?.spotId === +id)

    useEffect(() => {
        dispatch(GetReviewBySpot(id))
            .then(() => setIsLoaded(true))
    }, [dispatch, reviews.length])



    return (
        <div>
            <div className='Review_by_spots_title'>
                <div className='review_at_spot_detail_page'>
                    <div className='review_info_at_spot_detail_page'>
                        <i className="fa-solid fa-star spot_reviews_item"></i>
                        {spot.avgStatRating ? <h3 className='review_buffer_left'> {spot.avgStatRating}</h3>
                            : <h3 className='review_buffer_left'>0.00</h3>
                        }

                        <h3>·</h3>

                        {spot.numReviews ? <h3 className='review_buffer_right'>{spot.numReviews} Reviews</h3>
                            : <h3 className='review_buffer_right'>New</h3>
                        }
                    </div>
                    {user &&
                        <ReviewFormModal action='Add Review' />
                    }
                </div>
            </div>
            <div className="review_detail_container">
            {
                filteredReviews && filteredReviews.map(review => (
                    <div key={review.id}>
                        <div className='review_stars'>
                            <div>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div>
                                {review.stars}
                            </div>
                        </div>
                        <div className='review_discription'>
                            {review.review}
                        </div>
                    </div>
                ))
                
            }
            </div>
        </div>
    )

}

export default ReviewBySpot