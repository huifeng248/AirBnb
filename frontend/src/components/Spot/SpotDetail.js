import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './Spot.css'
import { getOneSpot, DeleteSpot } from '../../store/spot'
import { useHistory } from 'react-router-dom';
import ReviewBySpot from '../Review/ReviewBySpot'
import ReviewFormModal from '../ReviewFormModal'
import { CreateBooking } from '../../store/booking'
import LoginForm from '../LoginFormModal/LoginForm';
import { Modal } from "../../context/Modal"

function SpotDetail() {
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsloaded] = useState(false)
    const spots = useSelector((state) => state.spots)
    const reviews = useSelector((state) => state.reviews)
    const spot = spots[+id]
    const user = useSelector(state => state.session.user)
    const current_date = new Date().toLocaleDateString('en-ca')
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [errors, setErrors] = useState([])
    const [showModal, setShowModal] = useState(false)

    function totalStay(start, end) {
        let start_date = new Date(start);
        let end_date = new Date(end);
        let diff = end_date.getTime() - start_date.getTime();
        // get time is in mili second, convert this into days
        let totalDays = Math.ceil(diff / (1000 * 3600 * 24));
        return totalDays;
    }


    useEffect(() => {
        dispatch(getOneSpot(id))
            .then(() => {
                setIsloaded(true)
                setErrors([])
            })
    }, [dispatch, id, reviews, user])

    Date.prototype.addDays = function (num_days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + num_days);
        return date;
    }

    const SubmitBooking = async (e) => {
        e.preventDefault()

        let errors_arr = []

        if (!startDate) {
            errors_arr.push("Please pick a check-in Date")
        }
        if (!endDate) {
            errors_arr.push("Please pick a check-out Date")
        }

        if (!user) {
            setShowModal(true)
            // errors_arr.push("Please log in to make a reservation")
        }
        if (errors_arr.length > 0) {
            return setErrors(errors_arr)
        }

        const new_booking_payload = {
            startDate,
            endDate
        }

        dispatch(CreateBooking(spot.id, new_booking_payload))
            .catch(async (data) => {
                // console.log("DDDDDDDD", data)
                const result = await data.json()

                if (result && result.errors) {
                    setErrors(Object.values(result.errors))
                }
            })

    }


    return (
        isLoaded &&
        <div className='spot_detail_page_container'>
            {/* <div key={`spot-details- ${spot.id}`}> */}
            <div>
                <h1 className='spot_detail_title'>{spot.name}</h1>
                <div className='spot_reviews_item_container'>
                    <div className='span_div'>
                        <i className="fa-solid fa-star spot_reviews_item"></i>
                        <div className='review_char'>{spot.avgStatRating ? (` ${spot.avgStatRating.toFixed(2)}`) : "New"}</div>
                    </div>
                    <div className='dot_div'> · </div>
                    <div className='span_div'>
                        <div className='review_char'>{spot.numReviews} Reviews</div>
                        {/* <div className='review_char'>{` Reviews`}</div> */}
                    </div>
                    <div className='dot_div'> · </div>
                    <div className='span_div'>
                        <div className='spot_reviews_item'> Host by {spot.owner.firstName} {spot.owner.lastName}</div>
                    </div>
                    <div className='dot_div'> · </div>
                    <div className='span_div'>
                        <div className='spot_reviews_item'>{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
                    </div>
                </div>

                <div className='main_body'>

                    <div className='spot_image_container'>
                        <div className='spot_prevew_image_container'>
                            <img className='spot_prevew_image' src={spot.previewImage}></img>
                        </div>
                        <div className='spot_small_image_container'>
                            {
                                spot.images &&
                                spot.images.map((image, index) => (
                                    <div key={index} className='image_div'>
                                        <img className='spot_small_image' src={image.url}></img>
                                    </div>
                                )
                                )

                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='wrapping_booking_container'>

                <div className='spot_left_container' >
                    <div className='detail_discription_container'>
                        <h2>Entire home hosted by {spot.owner.firstName}</h2>
                        <div className='spot_description'>
                            {spot.description}
                        </div>
                    </div>
                    <div>
                        <div className='review_section_container'>
                            <ReviewBySpot />
                        </div>
                    </div>
                </div>

                <div className='booking_container'>

                    <div className='price_and_review_container'>

                        <div className='price_info_container'>
                            <div className='price_info'>${spot.price}</div>
                            <div className='price_info_night'>night</div>
                        </div>

                        <div className='review_block_container'>
                            <i className="fa-solid fa-star spot_reviews_item"></i>
                            <div className='review_char'>{spot.avgStatRating ? (` ${spot.avgStatRating.toFixed(2)}`) : "New"}</div>
                            <div className='dot_div'> · </div>
                            <div className='review_char_form'>{spot.numReviews} Reviews</div>
                        </div>
                    </div>

                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <LoginForm onClose={() => setShowModal(false)} />
                        </Modal>
                    )}

                    {errors.length > 0 && <div className='error_message_container'>
                        {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>}
                    <form className='Booking_form'
                        onSubmit={SubmitBooking}>
                        <div className='booking_form_container'>


                            <label className='check_in_and_out'>CHECK-IN</label>
                            <input
                                type="date"
                                className='date_input'
                                min={new Date().toLocaleDateString('en-ca')}
                                onChange={(e) => {
                                    setStartDate(e.target.value)
                                    setErrors([])
                                }}
                                value={startDate}
                            >
                            </input>

                            <label className='check_in_and_out'>CHECK-OUT</label>
                            <input
                                type="date"
                                className='date_input'
                                min={new Date(startDate).addDays(2).toLocaleDateString('en-ca')}
                                onChange={(e) => {
                                    setEndDate(e.target.value)
                                    setErrors([])

                                }}
                                value={endDate}>
                            </input>

                            <button type="submit"
                                className='reserve_button'>Reserve</button>

                        </div>
                    </form>

                    <div className='no_charge'>You won't be charged yet</div>

                    <div className='fee_container'>
                        <div className='fee_sub_container'>
                            {startDate && endDate && totalStay(startDate, endDate) ?

                                <div> {spot.price} x  $ {totalStay(startDate, endDate)} night </div>
                                :

                                <div> {spot.price} x 0 night</div>
                            }

                            {startDate && endDate ?
                                <div> {spot.price * totalStay(startDate, endDate)}</div> :

                                <div> $ 0 </div>
                            }

                        </div>
                        <div className='fee_sub_container'>
                            <div> Cleaning fee</div>
                            <div> $200</div>
                        </div>
                        <div className='fee_sub_container'>
                            <div>Service fee</div>
                            {startDate && endDate && totalStay(startDate, endDate) ?
                                <div> ${spot.price * totalStay(startDate, endDate) * 0.15} </div> :
                                <div> $ 0</div>
}
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </div >

    )

}


export default SpotDetail