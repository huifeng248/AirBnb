import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {GetReviewBySpot} from '../store/review'

function AvgRating({spotId}) {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const reviews = useSelector(state => {
        return Object.values(state.reviews)
    })
    const review = reviews.filter(review => review.spotId === spotId)

    
    useEffect(()=>{
        dispatch(GetReviewBySpot(spotId))
        .then(()=>setIsLoaded(true))
    },[dispatch])

    return (
        <div>
            hihihi average {review.stars}
        </div>
    )
    
}

export default AvgRating