import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { getReviewByUser } from "../../store/review"
import ReviewFormModal from "../ReviewFormModal";
import { deleteReview } from '../../store/review';
import './Review.css'

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
    },[dispatch])
    
    // if (!user) history.push('/') //adding this will cause warming
    return (
        isLoaded&&
        <div className="review_container">
            <h3>Manage Reviews</h3>
            
            <div className="review_content">{
                
                filteredReviews&&filteredReviews.map(review => (
                    <div className="single_review" key={review.id}>

                        {/* <div>Review Id {review.id}</div> */}
                            <div className="review_description">{review.review}</div>
                            <div className="review_starts"> 
                                <i className="fa-solid fa-star"></i>
                                <div>{review.stars}</div>
                            </div>
                    
                        {/*                             
                        {
                            review.Images.map(image => (
                                <span key={image.url}>
                                    <img src={image.url}>image</img>
                                </span>
                            ))
                        } */}
                        <div className="review_button_container">
                            <ReviewFormModal action='Edit' reviewId={review.id}/>
                            <button className="manage_review_delete_button" onClick={()=>dispatch(deleteReview(review.id))}>Delete</button>
                        </div>
                    </div>
                ))
            }</div>

        </div>
    )
}
export default ReviewDetailByUser
