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
    console.log("########", reviews)
    const filteredReviews = reviews.filter(review => review?.spotId ===+id)

    console.log("reviewId!!!!", id, filteredReviews)
    useEffect(()=>{
        console.log(" review thunk run")
        dispatch(GetReviewBySpot(id))
            .then(()=>setIsLoaded(true))
    },[dispatch])
    
    console.log("get review by spot", reviews)

    return (
        <div>
            <h1>review by spot id</h1>
            {
                filteredReviews&&filteredReviews.map(review => (
                    <div>
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