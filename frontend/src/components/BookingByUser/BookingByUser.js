import React, { useEffect, useState } from 'react'
import { Modal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { GetUserBooking } from '../../store/booking'
import {getSpots} from '../../store/spot'
import './BookingByUser.css'

function BookingByUser() {
    const dispatch = useDispatch()
    const bookings = useSelector(state => Object.values(state.bookings))
    const spots = useSelector(state => state.spots)

    useEffect(() => {
        dispatch(GetUserBooking())
        dispatch(getSpots())
    }, [])

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

                        <div className='booking_button_container'>
                            <button> Edit </button>
                            <button> Delete</button>
                        </div>
                    </div>
                }) :
                <div> There is no booking yet</div>
            }

        </div>
    )
}

export default BookingByUser