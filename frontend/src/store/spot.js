import { csrfFetch } from './csrf';

const LOAD_Spots = 'spots/LOAD'
const GET_One_Spot = 'spots/GET_DETAILS'
const GET_Spot_User = 'spots_current_user/GET'
const UPDATE_SPOT = 'spots/UPDATE'
const CREATE_SPOT = 'spots/CREATE'
const DELETE_SPOT = 'spots/DELETE'

const loadSpots = (list) =>({
    type: LOAD_Spots,
    list
})

const getSpotById = (spot) => ({
    type: GET_One_Spot,
    spot
})

const getSpotByCurrentUser = (spots) => ({
    type: GET_Spot_User,
    spots
})

const updateSpotAction = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

const createSpotAction = (spot) => ({
    type: CREATE_SPOT,
    spot
})

const deleteSpotAction = (spot) => ({
    type: DELETE_SPOT,
    spot
})

export const DeleteSpot = (spot) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(deleteSpotAction(spot))
        return spot
    }
}


export const UpdateSpot = (spot) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })
    
    if (response.ok) {
        const spot = await response.json()
        dispatch(updateSpotAction(spot))
        return spot
    }

}

export const CreateSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(createSpotAction(spot))
    }

}



// thunk action to get spots
// fetches all spots as a list
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    
    if (response.ok) {
        const list = await response.json()
        dispatch(loadSpots(list))
    }
}

// get one spot
export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getSpotById(spot))
    }
}

//get spot by current user
export const getSpotByUser = () => async dispatch =>  {
    const response = await csrfFetch('/api/spots/current')
    if (response.ok) {
        const spots = await response.json()
        dispatch(getSpotByCurrentUser(spots))
    }
}

const initialState = {}
const spotReducer = (state = initialState, action) =>{
    switch (action.type) {
        case LOAD_Spots :{
            const allSpot = {};
            action.list.spots.forEach(spot => {
                allSpot[spot.id] = spot
            })
            const newState = {...state, ...allSpot}
            return newState;
        }
        case GET_One_Spot : {
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }
        case GET_Spot_User : {
            const newState = {...state}
            action.spots.spots.map(spot => {
                return newState[action.spot] = spot
            })
            return newState
        }
        case UPDATE_SPOT : {
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }
        case CREATE_SPOT : {
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }  
        case DELETE_SPOT : {
            const newState = {...state}
            delete newState[action.spot.id]
            return newState
        }

        default: 
            return state

    }
}

export default spotReducer;