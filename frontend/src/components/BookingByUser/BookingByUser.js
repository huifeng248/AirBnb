import React, { useEffect, useState } from 'react'
import { Modal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { GetUserBooking, DeleteBooking, EditBooking } from '../../store/booking'
import { getSpots } from '../../store/spot'
import './BookingByUser.css'
import BookingModal from '../BookingModal/BookingModal'

function BookingByUser() {
    const dispatch = useDispatch()
    const bookings = useSelector(state => Object.values(state.bookings))
    const spots = useSelector(state => state.spots)
    const [errors, setErrors] = useState([])
    const today = new Date()
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        dispatch(GetUserBooking())
        dispatch(getSpots())
    }, [])

    function SubmitDeleteBooking(id) {
        dispatch(DeleteBooking(id))
            .catch(async (data) => {
                const result = await data.json()

                console.log("!!!!!!!", result)
                if (result && result.message) {
                    setErrors(Object.values(result.message))
                }
            })
    }

    return (
        <div>
            {bookings.length ?
                bookings.map((booking, index) => {
                    return <div key={index}>
                        <div> {spots[booking.spotId].name} </div>
                        <div> {spots[booking.spotId].price} </div>
                        <div> {booking.startDate} </div>
                        <div> {booking.endDate} </div>
                        <div> {booking.spotId}</div>
                        <div> {spots[booking.spotId].address}, {spots[booking.spotId].city}, {spots[booking.spotId].state}
                        </div>

                        {/* {errors.length > 0 && <div className='booking_error_message_container'>
                            {errors.map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>} */}

                        {new Date(booking.startDate) > today &&
                            <div className='booking_button_container'>
                                <button onClick={()=> setShowModal(true)}> Edit </button>
                                {
                                    showModal && 
                                    <Modal onClose={()=> setShowModal(false)}>
                                        <BookingModal onClose={()=> setShowModal(false)} booking={booking} spot={spots[booking.spotId]}/>
                                    </Modal>

                                    
                                }
                                <button onClick={() => SubmitDeleteBooking(booking.id)}>Delete</button>
                            </div>
                        }
                    </div>
                }) :
                <div> There is no booking yet</div>
            }

        </div>
    )
}

export default BookingByUser