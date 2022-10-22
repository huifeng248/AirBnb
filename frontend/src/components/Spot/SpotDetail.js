import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './Spot.css'
import { getOneSpot, DeleteSpot } from '../../store/spot'
import { useHistory } from 'react-router-dom';
import ReviewBySpot from '../Review/ReviewBySpot'
import ReviewFormModal from '../ReviewFormModal'

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

    useEffect(() => {
        dispatch(getOneSpot(id))
            .then(() => setIsloaded(true))
    }, [dispatch, id, reviews])

    Date.prototype.addDays = function (num_days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + num_days);
        return date;
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
                    <div className='price_info_container'>
                        <div className='price_info'>${spot.price}</div>
                        <div className='price_info_night'>night</div>
                    </div>
                    <form className='Booking_form'>
                        <div>

                            <label>CHECK-IN</label>
                            <input
                                type="date"
                                min={current_date}
                                onChange={(e) => {
                                    console.log("************", e.target.value)
                                    // console.log("minnnnnnn", current_date)
                                    setStartDate(e.target.value)
                                }}
                                value={startDate}
                            >
                            </input>
                        </div>

                        <div>
                            <label>CHECK-OUT</label>
                            <input
                                type="date"
                                // min={new Date(startDate)+1}
                                min={new Date(startDate).addDays(2).toLocaleDateString('en-ca')}
                                onChange={(e) => {
                                    // console.log("Minnnnnnn", new Date(startDate).addDays(10))
                                    setEndDate(e.target.value)
                                }}
                                value={endDate}>
                            </input>
                        </div>
                        <div>
                            <button type="submit" className='reserve_button'>Reserve</button>
                        </div>
                    </form>

                    <div>You won't be charged yet</div>

                    <div>
                        {/* {startDate && endDate && <div>{`$ ${spot.price}x ${endDate.toLocaleDateString('en-ca')} - ${startDate.toLocaleDateString('en-ca')} nights`} </div>} */}
                        <div> Cleaning fee</div>
                        <div>Service fee</div>
                    </div>
                    
                    <div>

                    </div>
                </div>
            </div>




        </div >

    )

}


export default SpotDetail