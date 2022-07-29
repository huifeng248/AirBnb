import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { getReviewByUser } from "../../store/review"
import ReviewFormModal from "../ReviewFormModal";
import { deleteReview } from '../../store/review';

function ReviewDetailByUser () {
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsloaded] = useState(false)
    const reviews = useSelector(state => {
        return Object.values(state.reviews)
    })
    const user = useSelector((state)=> state.session.user)
    const filteredReviews = Object.values(reviews).filter(review=> review.User?.id===user?.id)
    useEffect(() => {
        dispatch(getReviewByUser(filteredReviews))
            .then(() => setIsloaded(true))
    },[dispatch, reviews.length])
    
    return (
        isLoaded&&<div>
            <h1>review by current user</h1>
            {/* <ReviewFormModal action='Add Review'/> */}
            {
                
                filteredReviews&&filteredReviews.map(review => (
                    <div key={review.id}>
                        <div>{review.id}</div>
                        <div>{review.ownerId}</div>
                        <div>{review.review}</div>
                        <div>{review.stars}</div>
{/* 
                        {
                            review.Images.map(image => (
                                <span key={image.url}>
                                    <img src={image.url}>image</img>
                                </span>
                            ))
                        } */}
                        <div>
                        <ReviewFormModal action='Edit' reviewId={review.id}/>
                        </div>
                        <button onClick={()=>dispatch(deleteReview(review.id))}>Delete</button>
                    </div>
                ))
            }
        </div>
    )
}
export default ReviewDetailByUser
