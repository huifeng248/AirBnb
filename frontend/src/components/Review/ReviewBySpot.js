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
    },[dispatch])


    return (
        <div>
            <h1>review by spot id</h1>
            {
                filteredReviews&&filteredReviews.map(review => (
                    <div key={review.id}>
                        <div>
                            {review.review}
                        </div>
                        <div>hellow</div>
                        <div>
                            {review.stars}
                        </div>
                    </div>
                ))
            
            }
        </div>
    )

}

export default ReviewBySpot