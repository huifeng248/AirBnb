import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {GetReviewBySpot} from '../store/review'

function AvgRating({spotId}) {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const reviews = useSelector(state => {
        return Object.values(state.reviews)
    })
    console.log("reviewstate", reviews)
    // if (reviews) console.log("reviewstate", reviews)
    const review = reviews.filter(review => review.spotId === spotId)

    
    useEffect(()=>{
        console.log(" review thunk run")
        dispatch(GetReviewBySpot(spotId))
        .then(()=>setIsLoaded(true))
    },[dispatch])

    console.log("~~~~~~!!!", reviews)
    
    console.log("~~~~~~~~~", reviews)

    return (
        <div>
            hihihi average {review.stars}
        </div>
    )
    
}

export default AvgRating