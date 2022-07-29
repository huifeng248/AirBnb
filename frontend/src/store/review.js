import { csrfFetch } from './csrf';

const Get_Review_User = 'review_by_user/GET'
const Get_Review_Spot = 'review_by_spot/GET'
const CREATE_REVIEW = 'review/CREATE'
const UPDATE_REVIEW = 'review/UPDATE'
const DELETE_REVIEW = 'review/DELETE'

const GetReviewByUserAction = (reviews)=> ({
    type: Get_Review_User,
    reviews
})

const GetReviewBySpotAction = (reviews) => ({
    type: Get_Review_Spot,
    reviews
})

const createReviewAction = (review) => ({
    type: CREATE_REVIEW,
    review
})

const updateReviewAction = (review)=>({
    type: UPDATE_REVIEW,
    review
})

const deleteReviewAction = (id) => ({
    type: DELETE_REVIEW,
    id
})

//get review by user
export const getReviewByUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current')
    // console.log("action thunk run", response)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(GetReviewByUserAction(reviews))
    }
} 

//get review by spot
export const GetReviewBySpot = (id) => async(dispatch) => {
    console.log("before fetch id", id)
    const response = await csrfFetch (`/api/spots/${id}/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        console.log("action thunk run", reviews)
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
            const newState = {...state}
            action.reviews.map (review => {
                return newState[review.id]=review
            })
            return newState
        }
        case Get_Review_Spot : {
            const newState = {...state}
            action.reviews.map (review => {
                return newState[review.id] = review
            })
            return newState
        }
        case CREATE_REVIEW : {
            const newState = {...state}
            newState[action.review.id] = action.review
            return newState
        }
        case UPDATE_REVIEW : {
            const newState = {...state}
            newState[action.review.id] = action.review
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