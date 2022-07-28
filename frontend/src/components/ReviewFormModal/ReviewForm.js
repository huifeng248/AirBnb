import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateReview, createReview } from '../../store/review';
import { useParams } from 'react-router-dom';


function ReviewForm ({action, reviewId, onClose}) {
    console.log("!!!!!", reviewId)
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);
    const review = reviews[reviewId]
    console.log("review!!", reviews)
    const [reviewContent, setReviewContent] = useState(review? review.review : "")
    const [stars, setStars] = useState(review? review.stars: "")
    const [errors, setErrors] = useState([]);

    const {id} = useParams()
    console.log("SPOTTTTT", id)
    const spots = useSelector(state => state.spots)
    const user = useSelector(state =>state.session.user)
    
    console.log("userrrrrr", user)
    const userId = user.id

    const handleSubmit = (e) => {
        e.preventDefault()
        const editPayload = {
            // spotId,
            id: reviewId,
            stars,
            review: reviewContent
        }

        const createPayload = {
            userId,
            spotId: id,
            stars,
            review: reviewContent
        }
        console.log("action", action)
        
        if (action === 'Edit') {
            dispatch(updateReview(editPayload))
            .then(()=> onClose())
            .catch(async (res) => {
                console.log("this is res", res)
                const data = await res.json()
                if (data && data.errors) setErrors (data.errors)
            })
            
        } else if (action === 'Add Review') {
            dispatch(createReview(createPayload))
            .then(()=> onClose())
            .catch(async(res)=> {
                const data = await res.json()
                console.log("This is reading~~~", data)
                if (data && data.errors) setErrors(data.errors)
            })
        }
    }

    return (
        <section>
            <h2>{action}</h2>
            <form
                onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error,index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Review
                        <input
                            value={reviewContent}
                            onChange={(e)=>setReviewContent(e.target.value)}
                            placeholder='review'
                            type='text'
                            />
                    </label>
                    <label>
                        starts
                        <input value={stars}
                        onChange={(e)=>setStars(e.target.value)}
                        type='number'
                        placeholder='place a rating'
                        />
                    </label>
                    <button type='submit'>{action}</button>
            </form>
        </section>
    )
}

export default ReviewForm