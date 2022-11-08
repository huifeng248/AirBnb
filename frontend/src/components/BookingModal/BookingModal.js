import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateReview, createReview } from '../../store/review';
import {EditBooking} from '../../store/booking'
import { useParams } from 'react-router-dom';
import './BookingModal.css'

function BookingModal({ booking, spot, onClose }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [startDate, setStartDate] = useState(booking.startDate)
    const [endDate, setEndDate] = useState(booking.endDate)
    const user = useSelector(state => state.session.user)

    function totalStay(start, end) {
        let start_date = new Date(start);
        let end_date = new Date(end);
        let diff = end_date.getTime() - start_date.getTime();
        // get time is in mili second, convert this into days
        let totalDays = Math.ceil(diff / (1000 * 3600 * 24));
        return totalDays;
    }

    Date.prototype.addDays = function (num_days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + num_days);
        return date;
    }


    const editBooking = async (e) => {
        e.preventDefault()

        let errors_arr = []

        // if (!user) {
        //     setShowModal(true)
        // } else {

            if (!startDate) {
                errors_arr.push("Please pick a check-in Date")
            }
            if (!endDate) {
                errors_arr.push("Please pick a check-out Date")
            }
            
            if (errors_arr.length > 0) {
                return setErrors(errors_arr)
            }
            
            const edit_booking_payload = {
                startDate,
                endDate
            }
            
            dispatch(EditBooking(booking.id, edit_booking_payload))
            // .then(()=> history.push('/bookings/current'))
            .catch(async (data) => {
                const result = await data.json()
                
                if (result && result.errors) {
                    setErrors(Object.values(result.errors))
                }
            })
        // }
    }

    return (
        <div>

            <div>{booking.startDate}</div>
            <div>{booking.endDate}</div>


            {errors.length > 0 && <div className='error_message_container'>
                {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </div>}
            
            <form className='Booking_form'
                        onSubmit={editBooking}>
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
                                <div> ${(spot.price * totalStay(startDate, endDate) + 200) * 0.15} </div> :
                                <div> $ 0</div>
                            }
                        </div>
                    </div>
        </div>
    )

}

export default BookingModal