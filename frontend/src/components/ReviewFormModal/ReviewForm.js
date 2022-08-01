import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateReview, createReview } from '../../store/review';
import { useParams } from 'react-router-dom';
import './ReviewForm.css'

function ReviewForm ({action, reviewId, onClose}) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);
    const review = reviews[reviewId]
    const [reviewContent, setReviewContent] = useState(review? review.review : "")
    const [stars, setStars] = useState(review? review.stars: "")
    const [errors, setErrors] = useState([]);

    const {id} = useParams()
    const spots = useSelector(state => state.spots)
    const user = useSelector(state =>state.session.user)
    
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
        // console.log("action", action)
        
        if (action === 'Edit') {
            dispatch(updateReview(editPayload))
            .then(()=> onClose())
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors (data.errors)
            })
            
        } else if (action === 'Add Review') {
            dispatch(createReview(createPayload))
            .then(()=> onClose())
            .catch(async(res)=> {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
        }
    }

    return (
        <section className='edit_section_container'>
            <h3 className='edit_title'>{action} a review</h3>
            <form className='edit_form_container'
                onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error,index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                    <div className='edit_form_info_container'>
                        <div>
                            <label>
                                Review
                            </label>
                                <input className='edit_input_field'
                                    value={reviewContent}
                                    onChange={(e)=>setReviewContent(e.target.value)}
                                    placeholder='review'
                                    type='text'
                                    maxLength="255"
                                />
                        </div>
                        <div>

                        <label>
                            starts
                        </label>
                        <input  className='edit_input_field'
                            value={stars}
                            onChange={(e)=>setStars(e.target.value)}
                            type='number'
                            placeholder='place a rating'
                        />
                        <div>
                            <button className="edit_button" type='submit'>{action}</button>
                        </div>
                        </div>
                    </div>
            </form>
        </section>
    )
}

export default ReviewForm