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
    // console.log("TTTTT", today)

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
        <div className='managing_bookings_container'>
            <div className='booking_title'>Manage your bookings</div>
            <div className='booking_sub_title'>All bookings</div>

            <div className='all_booking_wrapper'>

                {bookings.length ?
                    bookings.map((booking, index) => {
                        return <div className='booking_detail_holder'
                            key={index}>
                            <div className='booking_detail_holder_left'>

                                <div className='image_holder'>
                                    <img src={spots[booking.spotId].previewImage}
                                        alt="spot_preview_image"
                                        className='spot_preview_image'>
                                    </img>
                                    {/* <div> {spots[booking.spotId].previewImage}, {spots[booking.spotId].city}, {spots[booking.spotId].state} </div> */}
                                </div>
                                <div className='booking_detail_left_container'>

                                    <div className='booking_address'> {spots[booking.spotId].name} </div>
                                    <div> Price: ${spots[booking.spotId].price} nightly </div>
                                    <div> From {booking.startDate.split("T")[0]} To {booking.endDate.split("T")[0]}</div>
                                    {/* <div> {booking.spotId}</div> */}
                                    <div> Address: {spots[booking.spotId].address}, {spots[booking.spotId].city}, {spots[booking.spotId].state}
                                    </div>
                                </div>
                            </div>

                            {/* {errors.length > 0 && <div className='booking_error_message_container'>
                            {errors.map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>} */}

                            {new Date(booking.startDate) >= today &&
                                
                                <div className='booking_button_container'>
                                    <button 
                                        className='booking_buttons reserve_button'
                                        onClick={() => setShowModal(true)}> Edit </button>
                                    {
                                        showModal &&
                                        <Modal onClose={() => setShowModal(false)}>
                                            <BookingModal onClose={() => setShowModal(false)} booking={booking} spot={spots[booking.spotId]} />
                                        </Modal>


                                    }
                                    <button 
                                        className='booking_buttons reserve_button'
                                        onClick={() => SubmitDeleteBooking(booking.id)}>Delete</button>
                                </div>
                            }
                        </div>
                    }) :
                    <div> There is no booking yet</div>
                }

            </div>

        </div>
    )
}

export default BookingByUser