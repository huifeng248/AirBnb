import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import {GetReviewBySpot} from '../../store/review'


function ReviewBySpot () {
    const {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const reviews = useSelector(state => {
        return Object.values(state.reviews)
    })
    const filteredReviews = reviews.filter(review => review?.spotId ===+id)

    useEffect(()=>{
        dispatch(GetReviewBySpot(id))
            .then(()=>setIsLoaded(true))
    },[dispatch, reviews.length])


    return (
        <div>
            <h3>Reviews</h3>
            {
                filteredReviews&&filteredReviews.map(review => (
                    <div key={review.id}>
                        <div className='review_stars'>
                            <div>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div>
                                {review.stars}
                            </div>
                        </div>
                        <div>
                            {review.review}
                        </div>
                    </div>
                ))
            
            }
        </div>
    )

}

export default ReviewBySpot