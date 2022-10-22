// api/spots/:id/bookings

import { csrfFetch } from './csrf';

const Create_Bookings = "CREATE_BOOKINGS"
const Edit_Bookings = "Edit_BOOKINGS"
const Delete_Bookings = "DELETE_BOOKINGS"
const GET_USER_Bookings = "GET_USER_BOOKINGS"

const Create_Booking_Action = (booking) => ({
    type: Create_Bookings,
    booking
})

const Edit_Booking_Action = (booking) => ({
    type: Edit_Bookings,
    booking
})

const Delete_Booking_Action = (id) => ({
    type: Delete_Bookings,
    id
})

const Get_Booking_Action = (bookings) => ({
    type: GET_USER_Bookings,
    bookings

})

// get booking by spots 
export const GetSpotBooking = () => async (dispatch) => {
    const response = await csrfFetch('api/bookings/current')
    if (response.ok) {
        const bookings = await response.json()
        dispatch(GET_USER_Bookings(bookings))
    }
}



//get review by user
export const getReviewByUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current')
    if (response.ok) {
        const reviews = await response.json()
        dispatch(GetReviewByUserAction(reviews))
    }
} 

//get review by spot
export const GetReviewBySpot = (id) => async(dispatch) => {
    const response = await csrfFetch (`/api/spots/${id}/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(GetReviewBySpotAction(reviews))
    }
}

//create review
export const createReview = (review) => async (dispatch) => {
    const response = await csrfFetch (`/api/spots/${review.spotId}/reviews`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json()
        dispatch(createReviewAction(review))
    }
} 

// update review
export const updateReview = (review) => async(dispatch) => {
    const response = await csrfFetch (`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const review = await response.json()
        dispatch(updateReviewAction(review))
    }
}

//delete review 
export const deleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const review = await response.json()
        dispatch(deleteReviewAction(id))
    }

}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {

        case Get_Review_User : {
            let newState = {}
            if (!action.reviews.length) {
                newState = {}
                return newState
            }
            action.reviews.map (review => {
                return newState[review.id]=review
            })
            return newState
        }
        case Get_Review_Spot : {
            let newState = {...state}
            if (!action.reviews.length) {
                newState = {}
                return newState
            }
            action.reviews.map (review => {
                return newState[review.id] = review
            })
            return newState
        }
        case CREATE_REVIEW : {
            const newState = {...state}
            newState[action.review.id] = {...newState[action.review.id], ...action.review}
            return newState
        }
        case UPDATE_REVIEW : {
            const newState = {...state}
            newState[action.review.id] = {...newState[action.review.id],...action.review}
            return newState
        }
        case DELETE_REVIEW : {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
            
        default: 
            return state
    }
} 

export default reviewReducer