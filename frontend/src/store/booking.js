import { csrfFetch } from './csrf';

const CREATE_Bookings = "CREATE_BOOKINGS"
const EDIT_Bookings = "Edit_BOOKINGS"
const DELETE_Bookings = "DELETE_BOOKINGS"
const LOAD_Bookings = "LOAD_BOOKINGS"

const Get_Booking_Action = (bookings) => ({
    type: LOAD_Bookings,
    bookings

})

const Create_Booking_Action = (booking) => ({
    type: CREATE_Bookings,
    booking
})

const Edit_Booking_Action = (bookingId, booking) => ({
    type: EDIT_Bookings,
    bookingId, 
    booking
})

const Delete_Booking_Action = (id) => ({
    type: DELETE_Bookings,
    id
})


// get bookings by current user
export const GetUserBooking = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current')
    if (response.ok) {
        const bookings = await response.json()
        dispatch(Get_Booking_Action(bookings))
    }
}


// get bookings by spot
export const GetSpotBooking = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (response.ok) {
        const result = await response.json()
        dispatch(Get_Booking_Action(result.bookings))
    }
}

//create a new booking
export const CreateBooking = (spotId, booking) => async (dispatch) => {

    console.log("come here")
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
    
    if (response.ok) {
        const newBooking = await response.json()
        dispatch(Create_Booking_Action(newBooking))
    }
    console.log("!!!!!!ressssssssss", response)
}

//edit a booking 
export const EditBooking = (bookingId, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const booking = await response.json()
        dispatch(Edit_Booking_Action(bookingId, booking))
    }
}

//delete a booking 
export const DeleteBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(Delete_Booking_Action(bookingId))

    }
}

const initialState = {}

const bookingReducer = (state = initialState, action) => {
    let newState ={}
    switch (action.type) {
        case LOAD_Bookings:{
            action.bookings.forEach(booking => {
                newState[booking.id] = booking
            });
            return newState
        }
        case CREATE_Bookings: {
            newState = { ...state }
            newState[action.booking.id] = action.booking
            return newState
        }
        case EDIT_Bookings: {
            newState = {...state}
            newState[action.bookingId] = action.booking
            return newState
        }
        case DELETE_Bookings: {
            newState = {...state}
            delete newState[action.id]
            return newState
        }

        default:
            return state
    }
}

export default bookingReducer